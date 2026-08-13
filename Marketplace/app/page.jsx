"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Sparkles, Flame, ArrowRight, ShieldCheck, Heart, Truck, Phone, Gem } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/composants/ProductCard";
import { useStore } from "@/lib/store";

const campaigns = [
  {
    title: "Hydrater. Protéger. Briller.",
    subtitle: "Découvrez des formules légères et hautement concentrées adaptées au climat du Cameroun.",
    href: "/soins",
    image: "/Images/pexels-karola-g-4202326.jpg"
  },
  {
    title: "Sublimez votre beauté naturelle",
    subtitle: "Fonds de teint longue tenue, poudres matifiantes et blushes lumineux.",
    href: "/maquillage",
    image: "/Images/pexels-valeriiamiller-3680203.jpg"
  },
  {
    title: "Une signature olfactive unique",
    subtitle: "Des sillages captivants qui vous accompagnent du matin au soir.",
    href: "/parfums",
    image: "/Images/pexels-karola-g-5632335.jpg"
  },
  {
    title: "Éclat & Soins d'exception",
    subtitle: "Une sélection exclusive de produits haut de gamme pour sublimer votre routine.",
    href: "/catalogue",
    image: "/Images/pexels-chidy-31141638.jpg"
  }
];

const ribbonLinks = [
  { label: "Nouveautés & Bestsellers", href: "/catalogue?filter=bestseller" },
  { label: "Maquillage", href: "/maquillage" },
  { label: "Soins Visage", href: "/soins" },
  { label: "Corps & Bain", href: "/soins?q=corps" },
  { label: "Cheveux", href: "/soins?q=cheveux" },
  { label: "Parfums", href: "/parfums" },
  { label: "Promotions", href: "/promotions" },
  { label: "Découvrir", href: "/blog" }
];

const selections = [
  { kicker: "GLOW BASE", title: "Les essentiels pour un teint lumineux", href: "/maquillage", image: "/Images/pexels-karola-g-4202326.jpg" },
  { kicker: "SKIN RESET", title: "La routine hydratation qui fait la différence", href: "/soins", image: "/Images/pexels-valeriiamiller-3680203.jpg" },
  { kicker: "PARFUMS DE LUXE", title: "Une signature parfumée raffinée", href: "/parfums", image: "/Images/pexels-karola-g-5632335.jpg" },
  { kicker: "BEAUTY DEALS", title: "Les remises et coffrets du moment", href: "/promotions", image: "/Images/pexels-chidy-31141638.jpg" },
];

const beautyCategories = [
  ["Blush & Teint", "/maquillage?q=blush", "/Images/pexels-karola-g-4202326.jpg"],
  ["Coffrets Cadeaux", "/catalogue?q=kit", "/Images/pexels-valeriiamiller-3680203.jpg"],
  ["Fond de Teint", "/maquillage?q=foundation", "/Images/pexels-karola-g-5632335.jpg"],
  ["Soin des Lèvres", "/maquillage?q=lip", "/Images/pexels-chidy-31141638.jpg"],
  ["Maquillage Yeux", "/maquillage?q=eye", "/Images/pexels-karola-g-4202326.jpg"],
  ["Poudres Matifiantes", "/maquillage?q=powder", "/Images/pexels-valeriiamiller-3680203.jpg"],
];

const categoryRoutes = { Maquillage: "/maquillage", Soins: "/soins", Capillaire: "/capillaire", Parfums: "/parfums" };

const editorialQuotes = [
  { text: "L'Élégance est un équilibre subtil entre la simplicité, l'authenticité et le soin d'exception.", author: "CHRISTIAN DIOR HAUTE COUTURE" },
  { text: "La beauté commence au moment précis où vous décidez d'être pleinement vous-même.", author: "GUCCI BEAUTÉ PARFUMS" },
  { text: "Le luxe absolu est la rencontre entre le savoir-faire artisanal et la pureté des ingrédients.", author: "MAISON ITEXAL BEAUTY" },
  { text: "L'élégance ne consiste pas à se faire remarquer, mais à graver une empreinte inoubliable.", author: "GIORGIO ARMANI" },
  { text: "Chaque rituel de beauté est une ode à la création et à l'éclat singulier de chaque femme.", author: "YVES SAINT LAURENT" },
];

function HorizontalProductCarousel({ products }) {
  const railRef = useRef(null);

  const scroll = (direction) => {
    if (railRef.current) {
      const scrollAmount = railRef.current.clientWidth * 0.75;
      railRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products || !products.length) return null;

  return (
    <div className="horizontal-carousel-wrapper">
      <button
        type="button"
        className="carousel-nav-btn carousel-nav-prev"
        onClick={() => scroll("left")}
        aria-label="Précédent"
      >
        <ChevronLeft width={20} height={20} />
      </button>

      <div className="horizontal-carousel-rail" ref={railRef}>
        {products.map((product) => (
          <div className="carousel-item-wrap" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel-nav-btn carousel-nav-next"
        onClick={() => scroll("right")}
        aria-label="Suivant"
      >
        <ChevronRight width={20} height={20} />
      </button>
    </div>
  );
}

export default function HomePage() {
  const { products } = useStore();
  const [heroIndex, setHeroIndex] = useState(0);
  const newestRef = useRef(null);

  const newest = [...products.filter(p => p.new), ...products.filter(p => !p.new)].slice(0, 14);
  const promoProducts = products.filter(p => p.promo || p.oldPrice).slice(0, 14);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex(i => (i + 1) % campaigns.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const moveProducts = (direction) => {
    newestRef.current?.scrollBy({
      left: direction * Math.max(newestRef.current.clientWidth / 3, 280),
      behavior: "smooth"
    });
  };

  const currentCampaign = campaigns[heroIndex];

  return (
    <main className="modern-home">
      {/* Sleek Subnav Ribbon Bar (Matching Reference Image) */}
      <section className="subnav-ribbon-bar">
        <div className="container subnav-ribbon-container">
          <div className="subnav-links-group">
            {ribbonLinks.map((link) => (
              <Link key={link.label} href={link.href} className="subnav-link">
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/demande-produit" className="ask-ai-pill-btn">
            <Sparkles width={14} height={14} /> Ask AI
          </Link>
        </div>
      </section>

      {/* Hero Page Slider with Horizontal Sliding Track & Transparent Right-Aligned Content */}
      <section className="hero-page-slider" aria-label="Offres et nouveautés ITEXAL">
        {/* Horizontal Sliding Image Track */}
        <div
          className="hero-slider-track"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {campaigns.map((c, idx) => (
            <div key={idx} className="hero-slide-item">
              <img src={c.image} alt={c.title} className="hero-slide-bg-img" />
            </div>
          ))}
        </div>

        {/* Transparent Content Box Positioned on the Right Side */}
        <div className="hero-right-overlay">
          <div className="container hero-right-container">
            <div className="hero-right-content-box">
              <h1 className="hero-serif-title right-title">{currentCampaign.title}</h1>
              <p className="hero-subtitle right-subtitle">{currentCampaign.subtitle}</p>
              <div className="hero-actions-group right-actions">
                <Link href={currentCampaign.href} className="btn-pill-primary glow-btn">
                  Découvrir la collection <ArrowRight width={16} />
                </Link>
                <Link href="/catalogue" className="btn-pill-secondary glass-btn">
                  Tous nos produits
                </Link>
              </div>
              <div className="hero-social-proof right-proof">
                <div className="avatars-stack">
                  <img src="/Images/pexels-karola-g-4202326.jpg" alt="Client 1" />
                  <img src="/Images/pexels-valeriiamiller-3680203.jpg" alt="Client 2" />
                  <img src="/Images/pexels-karola-g-5632335.jpg" alt="Client 3" />
                </div>
                <span><strong>+12 000 clients satisfaits</strong> à Douala, Yaoundé & tout le Cameroun</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="hero-arrow-btn prev-arrow"
            onClick={() => setHeroIndex((heroIndex - 1 + campaigns.length) % campaigns.length)}
            aria-label="Diapositive précédente"
          >
            <ChevronLeft width={22} height={22} />
          </button>
          <button
            className="hero-arrow-btn next-arrow"
            onClick={() => setHeroIndex((heroIndex + 1) % campaigns.length)}
            aria-label="Diapositive suivante"
          >
            <ChevronRight width={22} height={22} />
          </button>

          {/* Slide Indicators */}
          <div className="hero-dots-bar right-dots">
            {campaigns.map((c, idx) => (
              <button
                key={idx}
                className={`dot ${heroIndex === idx ? "active" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Diapositive ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Editorial Selections Grid with Infinite Continuous Marquee */}
      <section className="section-padded selections-section">
        <div className="container">
          <header className="selections-head-luxury">
            <h2>Inspirations & Sélections ITEXAL</h2>
            <p>Des routines clés en main conçues pour sublimer votre peau au quotidien.</p>
          </header>
        </div>

        {/* Infinite Continuous Marquee Track */}
        <div className="marquee-infinite-container">
          <div className="marquee-track">
            {[...selections, ...selections, ...selections].map((item, index) => (
              <article key={`${item.kicker}-${index}`} className="uiverse-hover-card marquee-card">
                <Link href={item.href} className="uiverse-card-link">
                  {/* Invisible trigger layer for smooth peer hover effect */}
                  <div className="uiverse-peer-trigger" />

                  {/* Base Card Background Image & Content */}
                  <div className="uiverse-card-base">
                    <img src={item.image} alt={item.title} />
                    <span className="uiverse-kicker">{item.kicker}</span>
                    <h3 className="uiverse-base-title">{item.title}</h3>
                  </div>

                  {/* Top-Left Expanding Bubble */}
                  <div className="uiverse-bubble-top" />

                  {/* Bottom-Right Expanding Reveal Content */}
                  <div className="uiverse-bubble-reveal">
                    <span className="uiverse-reveal-eyebrow">DÉCOUVRIR LA COLLECTION</span>
                    <h4 className="uiverse-reveal-title">{item.title}</h4>
                    <span className="uiverse-reveal-btn">Explorer →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers / Full-Bleed Dior Luxury Section with Background Image */}
      {promoProducts.length > 0 && (
        <section className="section-padded flash-deals-dior-section">
          <div className="flash-deals-dior-bg-overlay" />
          <div className="container relative z-10">
            <header className="dior-section-header">
              <div className="dior-title-group">
                <span className="dior-eyebrow-tag">OFFRES PRIVILÈGES & SÉLECTION EN PROMOTION</span>
                <h2 className="dior-serif-heading">Les Ventes Flash & Offres Spéciales</h2>
              </div>
              <Link href="/promotions" className="dior-see-all-link">
                Découvrir toutes les offres →
              </Link>
            </header>

            <HorizontalProductCarousel products={promoProducts} />
          </div>
        </section>
      )}

      {/* Nouveautés Horizontal Carousel Slider */}
      <section className="section-padded new-arrivals-section">
        <div className="container">
          <header className="section-head-between">
            <div>
              <span className="eyebrow">ARRIVAGES RÉCENTS</span>
              <h2>Nos Nouveautés Beauté</h2>
            </div>
            <Link href="/nouveautes" className="see-all-link-styled">
              Voir toutes les nouveautés →
            </Link>
          </header>

          <HorizontalProductCarousel products={newest} />
        </div>
      </section>

      {/* Store Intro & Category Circles (Full-Bleed 100vw Banner) */}
      <section className="store-intro-section full-bleed-banner-wrap">
        <div className="store-intro-banner full-bleed-banner">
          <video autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/photos/31552020/pexels-photo-31552020.jpeg?auto=compress&w=1800">
            <source src="https://videos.pexels.com/video-files/7754395/7754395-hd_1080_1920_30fps.mp4" type="video/mp4" />
          </video>
          <div className="banner-overlay-text full-bleed-overlay">
            <span className="banner-eyebrow">HAUTE COUTURE BEAUTÉ</span>
            <h2>L'Excellence Beauté au Cameroun</h2>
            <p>Une sélection minutieuse de marques réputées pour prendre soin de votre teint, cheveux et corps.</p>
          </div>
        </div>
      </section>

      {/* Sub-Category Circle Avatars Row (Luxury Dior / Gucci Bubble Bar) */}
      <section className="section-padded container subcat-circles-section">
        <div className="subcat-circles-row luxury-dior-circles">
          {beautyCategories.map(([label, href, image]) => (
            <Link href={href} key={label} className="subcat-circle-item">
              <div className="subcat-avatar-wrap">
                <img src={image} alt={label} />
              </div>
              <span className="subcat-label">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Maquillage Full-Bleed Luxury Section with Background Image */}
      {(() => {
        const maquillageItems = products.filter((p) => p.category === "Maquillage");
        if (!maquillageItems.length) return null;
        return (
          <section className="section-padded category-fullbleed-section maquillage-bg-section">
            <div className="category-bg-overlay" />
            <div className="container relative z-10">
              <header className="dior-section-header">
                <div className="dior-title-group">
                  <span className="dior-eyebrow-tag">HAUTE COUTURE & TEINT ÉCLATANT</span>
                  <h2 className="dior-serif-heading">Maquillage</h2>
                </div>
                <Link href="/maquillage" className="dior-see-all-link">
                  Voir tout Maquillage ({maquillageItems.length}) →
                </Link>
              </header>

              <HorizontalProductCarousel products={maquillageItems} />
            </div>
          </section>
        );
      })()}

      {/* Christian Dior & Gucci Infinite Horizontal Marquee Editorial Ticker */}
      <section className="dior-gucci-marquee-ticker" aria-label="Citations Haute Couture">
        <div className="dior-marquee-track">
          {[...editorialQuotes, ...editorialQuotes, ...editorialQuotes].map((quote, idx) => (
            <div className="dior-quote-slide" key={`${quote.author}-${idx}`}>
              <span className="dior-star-icon">✦</span>
              <blockquote className="dior-quote-text-marquee">
                "{quote.text}"
              </blockquote>
              <cite className="dior-quote-author-marquee">— {quote.author} —</cite>
            </div>
          ))}
        </div>
      </section>

      {/* Soins (Skincare) Full-Bleed Luxury Section with Background Image */}
      {(() => {
        const soinsItems = products.filter((p) => p.category === "Soins");
        if (!soinsItems.length) return null;
        return (
          <section className="section-padded category-fullbleed-section soins-bg-section">
            <div className="category-bg-overlay" />
            <div className="container relative z-10">
              <header className="dior-section-header">
                <div className="dior-title-group">
                  <span className="dior-eyebrow-tag">L'ART DU SOIN BOTANIQUE & CELLULAIRE</span>
                  <h2 className="dior-serif-heading">Rituels & Soins d'Exception</h2>
                </div>
                <Link href="/soins" className="dior-see-all-link">
                  Découvrir toute la gamme Soins ({soinsItems.length}) →
                </Link>
              </header>

              <HorizontalProductCarousel products={soinsItems} />
            </div>
          </section>
        );
      })()}

      {/* Capillaire Full-Bleed Luxury Section with Background Image */}
      {(() => {
        const capillaireItems = products.filter((p) => p.category === "Capillaire");
        if (!capillaireItems.length) return null;
        return (
          <section className="section-padded category-fullbleed-section capillaire-bg-section">
            <div className="category-bg-overlay" />
            <div className="container relative z-10">
              <header className="dior-section-header">
                <div className="dior-title-group">
                  <span className="dior-eyebrow-tag">NUTRITION & ÉCLAT CAPILLAIRE PRÉCIEUX</span>
                  <h2 className="dior-serif-heading">Soins & Rituels Capillaires</h2>
                </div>
                <Link href="/capillaire" className="dior-see-all-link">
                  Découvrir toute la gamme Capillaire ({capillaireItems.length}) →
                </Link>
              </header>

              <HorizontalProductCarousel products={capillaireItems} />
            </div>
          </section>
        );
      })()}

      {/* Remaining Category Showcase Rows (Parfums, etc.) */}
      <section className="section-padded category-products-showcase container">
        {Object.keys(categoryRoutes)
          .filter((cat) => cat !== "Maquillage" && cat !== "Soins" && cat !== "Capillaire")
          .map((category) => {
            const items = products.filter((p) => p.category === category);
            if (!items.length) return null;
            return (
              <div className="category-showcase-row" key={category}>
                <header className="section-head-between image2-head">
                  <h2 className="serif-category-title">{category}</h2>
                  <Link href={categoryRoutes[category]} className="see-all-link-styled">
                    Voir tout {category} →
                  </Link>
                </header>

                <HorizontalProductCarousel products={items} />
              </div>
            );
          })}
      </section>

      {/* Split Showcase: Video Card (Left) + 4 Reassurance Feature Cards (Right) */}
      <section className="section-padded container video-reassurance-split-section">
        <div className="video-reassurance-grid">
          {/* Left Column: Video Card with Glass Overlay (Image 2 reference) */}
          <div className="video-card-side">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.pexels.com/photos/28117003/pexels-photo-28117003.jpeg?auto=compress&w=1000"
              className="video-bg-media"
            >
              <source src="https://videos.pexels.com/video-files/8479098/8479098-hd_1080_1920_24fps.mp4" type="video/mp4" />
            </video>

            <div className="video-glass-card-box">
              <span className="eyebrow-pill">BEAUTY IN MOTION</span>
              <h2 className="video-story-title">La texture se révèle en mouvement.</h2>
              <p className="video-story-desc">
                Des soins d'exception pensés pour agir en profondeur et sublimer la clarté de votre peau au quotidien.
              </p>
              <div className="video-story-actions">
                <div className="video-badge-tag">
                  <Sparkles width={14} height={14} />
                  <span>Pureté & Éclat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of 4 White Reassurance Cards (Image 3 reference) */}
          <div className="reassurance-2x2-grid">
            <div className="white-reassurance-card">
              <div className="card-icon-pill">
                <Truck width={24} height={24} />
              </div>
              <h3 className="card-serif-title">Livraison Rapide</h3>
              <p className="card-desc">
                Profitez d'une livraison express et soignée sur toutes vos commandes à Douala, Yaoundé et dans tout le Cameroun.
              </p>
            </div>

            <div className="white-reassurance-card">
              <div className="card-icon-pill">
                <Phone width={24} height={24} />
              </div>
              <h3 className="card-serif-title">Support Client 24/7</h3>
              <p className="card-desc">
                Notre équipe d'experts beauté est disponible à tout moment pour répondre à vos questions et vous conseiller.
              </p>
            </div>

            <div className="white-reassurance-card">
              <div className="card-icon-pill">
                <ShieldCheck width={24} height={24} />
              </div>
              <h3 className="card-serif-title">Satisfaction Garantie</h3>
              <p className="card-desc">
                Produits 100% certifiés et authentiques provenant directement des marques officielles et distributeurs agréés.
              </p>
            </div>

            <div className="white-reassurance-card">
              <div className="card-icon-pill">
                <Gem width={24} height={24} />
              </div>
              <h3 className="card-serif-title">Récompenses Exclusives</h3>
              <p className="card-desc">
                Rejoignez notre club privilège pour accumuler des points à chaque achat et débloquer des cadeaux exclusifs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

