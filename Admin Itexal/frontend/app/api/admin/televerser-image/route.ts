import { NextResponse } from "next/server";
import { validerEtSanitiserFichier } from "@/lib/securite/validation-fichiers";
import { verifierTokenSession } from "@/lib/securite/gestionnaire-session";
import { verifierPermissionRole } from "@/lib/securite/rbac";
import { enregistrerLogActivite } from "@/lib/securite/journalisation-securite";

export async function POST(request: Request) {
  try {
    // 1. Authentification & RBAC Check
    const cookieHeader = request.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/itexal_session_token=([^;]+)/);
    const session = verifierTokenSession(tokenMatch ? tokenMatch[1] : null);

    if (!session || !verifierPermissionRole(session.role, "GERER_PRODUITS")) {
      return NextResponse.json(
        { succes: false, erreur: "Accès refusé. Droits insuffisants pour téléverser des fichiers." },
        { status: 403 }
      );
    }

    // 2. Extrait du fichier depuis FormData
    const formData = await request.formData();
    const fichier = formData.get("image") as File | null;

    if (!fichier) {
      return NextResponse.json(
        { succes: false, erreur: "Aucun fichier n'a été fourni dans le formulaire." },
        { status: 400 }
      );
    }

    // 3. Validation stricte du fichier (Magic Bytes, Taille Max 5Mo, Extension & Renommage anti-Path Traversal)
    const resultatValidation = await validerEtSanitiserFichier(fichier);

    if (!resultatValidation.valide) {
      enregistrerLogActivite({
        utilisateurId: session.userId,
        nomUtilisateur: session.nom,
        roleUtilisateur: session.role,
        typeEvenement: "Sécurité",
        action: "REJET_TELEVERSEMENT_FICHIER",
        description: `Refus d'upload (${fichier.name}) : ${resultatValidation.erreur}`,
        niveauSeverite: "Avertissement",
        adresseIP: request.headers.get("x-forwarded-for") || "127.0.0.1",
      });

      return NextResponse.json(
        { succes: false, erreur: resultatValidation.erreur },
        { status: 400 }
      );
    }

    // 4. Log du téléversement réussi
    enregistrerLogActivite({
      utilisateurId: session.userId,
      nomUtilisateur: session.nom,
      roleUtilisateur: session.role,
      typeEvenement: "Produits",
      action: "TELEVERSEMENT_IMAGE_REUSSI",
      description: `Image produit téléversée avec succès (${resultatValidation.nomSecurise}, ${resultatValidation.tailleMo} Mo, Type: ${resultatValidation.mimeDetecte}).`,
      niveauSeverite: "Info",
      adresseIP: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    const urlFichierStocke = `/uploads/produits/${resultatValidation.nomSecurise}`;

    return NextResponse.json({
      succes: true,
      message: "Image validée et téléversée de manière sécurisée.",
      url: urlFichierStocke,
      nomSecurise: resultatValidation.nomSecurise,
      mime: resultatValidation.mimeDetecte,
      tailleMo: resultatValidation.tailleMo,
    });
  } catch (error) {
    return NextResponse.json(
      { succes: false, erreur: "Erreur lors du traitement binaire du fichier." },
      { status: 500 }
    );
  }
}
