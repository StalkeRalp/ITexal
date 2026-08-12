import { NextResponse } from "next/server";
import { verifierTokenSession } from "@/lib/securite/gestionnaire-session";
import { verifierPermissionRole } from "@/lib/securite/rbac";
import { validerDonneesProduit } from "@/lib/securite/validation-serveur";
import { nettoyerObjetPayload, verifierTokenCSRF } from "@/lib/securite/protection-injections";
import { enregistrerLogActivite } from "@/lib/securite/journalisation-securite";

export async function POST(request: Request) {
  try {
    // 1. Authentification & Vérification RBAC
    const cookieHeader = request.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/itexal_session_token=([^;]+)/);
    const session = verifierTokenSession(tokenMatch ? tokenMatch[1] : null);

    if (!session) {
      return NextResponse.json({ succes: false, erreur: "Accès non autorisé. Session invalide ou expirée." }, { status: 401 });
    }

    const permissionAccordee = verifierPermissionRole(session.role, "GERER_PRODUITS");
    if (!permissionAccordee) {
      enregistrerLogActivite({
        utilisateurId: session.userId,
        nomUtilisateur: session.nom,
        roleUtilisateur: session.role,
        typeEvenement: "Sécurité",
        action: "TENTATIVE_ACCES_NON_AUTORISE",
        description: `Tentative d'accès non autorisé à la création de produit par le rôle ${session.role}.`,
        niveauSeverite: "Avertissement",
        adresseIP: request.headers.get("x-forwarded-for") || "127.0.0.1",
      });

      return NextResponse.json({ succes: false, erreur: "Permission insuffisante pour gérer les produits." }, { status: 403 });
    }

    // 2. Validation Token CSRF sur action sensible
    const tokenCsrfEntete = request.headers.get("x-csrf-token");
    const tokenCsrfAttendu = request.headers.get("x-csrf-session");
    if (tokenCsrfEntete && tokenCsrfAttendu && !verifierTokenCSRF(tokenCsrfEntete, tokenCsrfAttendu)) {
      return NextResponse.json({ succes: false, erreur: "Échec de validation CSRF." }, { status: 403 });
    }

    // 3. Sanitisation XSS & Validation des données côté serveur
    const bodyBrut = await request.json();
    const bodyClean = nettoyerObjetPayload(bodyBrut);

    const validation = validerDonneesProduit(bodyClean);
    if (!validation.valide) {
      return NextResponse.json(
        { succes: false, erreur: "Données produit invalides.", erreurs: validation.erreurs },
        { status: 400 }
      );
    }

    // 4. Enregistrement simulé / préparé
    const nouveauProduit = {
      id: `prod-${Date.now()}`,
      ...bodyClean,
      creeLe: new Date().toISOString(),
    };

    // 5. Journalisation d'audit dans activity_logs
    enregistrerLogActivite({
      utilisateurId: session.userId,
      nomUtilisateur: session.nom,
      roleUtilisateur: session.role,
      typeEvenement: "Produits",
      action: "CREATION_PRODUIT_API",
      description: `Produit '${nouveauProduit.nom}' créé avec succès par ${session.nom}.`,
      niveauSeverite: "Info",
      adresseIP: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    return NextResponse.json({
      succes: true,
      message: "Produit créé avec succès.",
      produit: nouveauProduit,
    });
  } catch (error) {
    return NextResponse.json({ succes: false, erreur: "Erreur serveur lors de la création du produit." }, { status: 500 });
  }
}
