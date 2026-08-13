import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { SiteLayout } from "@/composants/SiteLayout";

const logo = "/logo/logo.png";

export const metadata = {
  title: { default: "ITEXAL Beauty", template: "%s — ITEXAL Beauty" },
  description: "Maquillage, soins et parfums sélectionnés au Cameroun.",
  icons: {
    icon: logo,
    shortcut: logo,
    apple: logo,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <StoreProvider>
          <SiteLayout>{children}</SiteLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
