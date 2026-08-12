import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifierAccesRoute } from "./lib/securite/rbac";
import { verifierTokenSession } from "./lib/securite/gestionnaire-session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 1. Force HTTPS / TLS Redirection en production
  const proto = request.headers.get("x-forwarded-proto");
  if (process.env.NODE_ENV === "production" && proto && proto !== "https") {
    return NextResponse.redirect(
      `https://${request.headers.get("host")}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    );
  }

  // Injecter les en-têtes de sécurité additionnels
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // 2. Contrôle d'accès basé sur les rôles (RBAC) sur les routes /admin
  if (pathname.startsWith("/admin")) {
    const cookieToken = request.cookies.get("itexal_session_token")?.value;
    const session = verifierTokenSession(cookieToken);

    // Si pas de session valide, laisser le layout client gérer la redirection auth ou rediriger
    if (session) {
      const { autorise } = verifierAccesRoute(pathname, session.role);
      if (!autorise) {
        // Redirection vers le dashboard principal avec alerte d'accès refusé
        const urlAccordeon = new URL("/admin", request.url);
        urlAccordeon.searchParams.set("erreur_securite", "acces_refuse");
        return NextResponse.redirect(urlAccordeon);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|icon.svg).*)",
  ],
};
