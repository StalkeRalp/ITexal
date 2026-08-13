import "./globals.css";
import Script from "next/script";
import { StoreProvider } from "@/lib/store";
import { SiteLayout } from "@/composants/SiteLayout";
import { PWAInstallBanner } from "@/composants/PWAInstallBanner";

const logo = "/logo/logo.png";

export const metadata = {
  title: { default: "ITEXAL Beauty", template: "%s — ITEXAL Beauty" },
  description: "Votre marketplace beauté de luxe au Cameroun — maquillage, soins, parfums et capillaire sélectionnés avec soin.",
  keywords: ["cosmétiques", "beauté", "Cameroun", "maquillage", "soins", "parfums", "ITEXAL"],
  authors: [{ name: "ITEXAL Beauty" }],
  manifest: "/manifest.json",
  themeColor: "#8738ce",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ITEXAL Beauty",
  },
  icons: {
    icon: logo,
    shortcut: logo,
    apple: logo,
  },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    url: "https://itexal.cm",
    siteName: "ITEXAL Beauty",
    title: "ITEXAL Beauty — Cosmétiques de Luxe au Cameroun",
    description: "Découvrez notre sélection de maquillage, soins, parfums et soins capillaires d'exception.",
    images: [{ url: logo, width: 512, height: 512, alt: "ITEXAL Beauty" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ITEXAL" />
        <link rel="apple-touch-icon" href="/logo/logo.png" />
        <meta name="msapplication-TileColor" content="#8738ce" />
        <meta name="msapplication-TileImage" content="/logo/logo.png" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StoreProvider>
          <SiteLayout>{children}</SiteLayout>
          {/* Bannière d'installation PWA personnalisée */}
          <PWAInstallBanner />
        </StoreProvider>
        {/* Service Worker Registration using Next.js Script component */}
        <Script
          id="pwa-sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) {
                      console.log('[PWA] Service Worker enregistré :', reg.scope);
                    })
                    .catch(function(err) {
                      console.warn('[PWA] Service Worker échoué :', err);
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
