import { NextResponse } from "next/server";
import { revoquerSession, verifierTokenSession } from "@/lib/securite/gestionnaire-session";
import { enregistrerLogActivite } from "@/lib/securite/journalisation-securite";

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/itexal_session_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      const session = verifierTokenSession(token);
      revoquerSession(token);

      if (session) {
        enregistrerLogActivite({
          utilisateurId: session.userId,
          nomUtilisateur: session.nom,
          roleUtilisateur: session.role,
          typeEvenement: "Authentification",
          action: "DECONNEXION_API",
          description: `Déconnexion effectuée avec révocation du jeton de session JWT.`,
          niveauSeverite: "Info",
          adresseIP: request.headers.get("x-forwarded-for") || "127.0.0.1",
        });
      }
    }

    const response = NextResponse.json({ succes: true, message: "Déconnexion réussie." });
    
    // Effacement sécurisé du cookie de session
    response.cookies.set("itexal_session_token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ succes: false, erreur: "Erreur lors de la déconnexion." }, { status: 500 });
  }
}
