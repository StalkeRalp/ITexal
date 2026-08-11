import { EnTeteHome } from "@/modules/home/composants/en-tete-home";
import { HeroHome } from "@/modules/home/composants/hero-home";
import { SectionDealsHome } from "@/modules/home/composants/section-deals-home";
import { SectionProduitsVedettes } from "@/modules/home/composants/section-produits-vedettes";
import { PiedDePageHome } from "@/modules/home/composants/pied-de-page-home";
import { FavorisProvider } from "@/lib/context/FavorisContext";

export default function PageAccueil() {
  return (
    <FavorisProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <EnTeteHome />
        <main className="flex-1">
          <HeroHome />
          <SectionDealsHome />
          <SectionProduitsVedettes />
        </main>
        <PiedDePageHome />
      </div>
    </FavorisProvider>
  );
}
