"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp, Bell, ChevronLeft, ChevronRight, Heart, LockKeyhole, LogOut, Menu, Package, Phone, Search, ShieldCheck, ShoppingBag, Sparkles, Truck, User, UserRound, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";
import { LogoutModal } from "@/composants/LogoutModal";

export function SiteLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, itemCount, wishlist, orders, products, user, logout, unreadNotificationsCount } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogue?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Instant live search matches
  const searchResults = searchQuery.trim().length >= 2 && products
    ? products.filter(p => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/soins", label: "Soins" },
    { href: "/maquillage", label: "Maquillage" },
    { href: "/parfums", label: "Parfums" },
    { href: "/capillaire", label: "Capillaire" },
    { href: "/comparateur", label: "Comparateur" },
    { href: "/marques", label: "Marques" },
    { href: "/blog", label: "Journal & Routines" }
  ];

  const ordersCount = orders ? orders.length : 0;
  const isAuthPage = ["/inscription", "/connexion", "/mot-de-passe-oublie", "/reinitialisation-mot-de-passe", "/verification-otp"].includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="site-layout">
      {/* Announcement Bar with Page Navigation Arrows */}
      <div className="topbar">
        <div className="container">
          {/* History Nav Arrows */}
          <div className="topbar-nav-history">
            <button 
              type="button" 
              onClick={() => router.back()} 
              className="history-nav-btn"
              title="Page précédente"
              aria-label="Page précédente"
            >
              <ChevronLeft width={16} />
            </button>
            <button 
              type="button" 
              onClick={() => router.forward()} 
              className="history-nav-btn"
              title="Page suivante"
              aria-label="Page suivante"
            >
              <ChevronRight width={16} />
            </button>
          </div>

          <div className="topbar-message">
            <Sparkles width={14} />
            <span>Livraison gratuite dès 25 000 FCFA à Douala & Yaoundé — Produits 100% Authentiques</span>
          </div>

          <div className="topbar-links">
            <Link href="/suivi-commande"><Truck width={13} /> Suivi commande</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact"><Phone width={13} /> Service Client</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="header-main-container">
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X width={24} /> : <Menu width={24} />}
          </button>

          {/* Left Navigation Links */}
          <nav className={`site-nav ${isMobileMenuOpen ? "is-open" : ""}`}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? "active" : ""}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Center Brand Logo */}
          <Link href="/" className="site-logo">
            <img src="/logo/logo.png" alt="ITEXAL Beauty" className="site-logo-img" />
            <div className="brand-wordmark">
              <strong>ITEXAL</strong>
              <small>BEAUTY CAMEROUN</small>
            </div>
          </Link>

          {/* Right Action Capsule */}
          <div className="site-actions">
            {/* Live Operational Search Box */}
            <div className={`header-search-wrapper ${isSearchOpen ? "is-expanded" : ""}`}>
              <form onSubmit={handleSearchSubmit} className="header-search-box">
                <input
                  type="text"
                  placeholder="Rechercher un produit, marque..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                />
                {searchQuery && (
                  <button type="button" className="btn-clear-search" onClick={() => setSearchQuery("")}>
                    <X width={14} />
                  </button>
                )}
                <button type="submit" aria-label="Rechercher">
                  <Search width={16} height={16} />
                </button>

                {/* Instant Autocomplete Search Results Overlay */}
                {searchQuery.trim().length >= 2 && (
                  <div className="search-results-overlay">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="results-header">
                          <span>Produits trouvés ({searchResults.length})</span>
                        </div>
                        <div className="results-list">
                          {searchResults.map((p) => (
                            <Link 
                              key={p.id} 
                              href={`/produit/${p.slug || p.id}`}
                              className="search-result-item"
                              onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                            >
                              <img src={p.image} alt={p.name} className="result-thumb" />
                              <div className="result-info">
                                <span className="result-brand">{p.brand}</span>
                                <h4 className="result-title">{p.name}</h4>
                                <strong className="result-price">{money ? money(p.price) : `${p.price} FCFA`}</strong>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <button type="submit" className="view-all-results-btn">
                          Voir tous les résultats pour "{searchQuery}" <ArrowRight width={14} />
                        </button>
                      </>
                    ) : (
                      <div className="no-results-box">
                        <span>Aucun produit trouvé pour "{searchQuery}"</span>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Notifications Link */}
            <Link 
              href="/notifications" 
              className="action-circle-btn" 
              aria-label="Notifications"
              onClick={(e) => {
                e.preventDefault();
                router.push("/notifications");
              }}
            >
              <Bell width={18} height={18} />
              <span className="action-counter badge-coral">{unreadNotificationsCount > 0 ? unreadNotificationsCount : 2}</span>
            </Link>

            {/* Wishlist Link */}
            <Link 
              href="/favoris" 
              className="action-circle-btn" 
              aria-label="Voir la liste d'envies"
              onClick={(e) => {
                e.preventDefault();
                router.push("/favoris");
              }}
            >
              <Heart width={18} height={18} />
              <span className="action-counter badge-coral">{wishlist.length > 0 ? wishlist.length : 2}</span>
            </Link>

            {/* Orders Icon */}
            <Link 
              href="/commandes" 
              className="action-circle-btn" 
              aria-label="Mes commandes"
              onClick={(e) => {
                e.preventDefault();
                router.push("/commandes");
              }}
            >
              <Package width={18} height={18} />
              <span className="action-counter badge-coral">{ordersCount > 0 ? ordersCount : 3}</span>
            </Link>

            {/* Cart Link */}
            <Link 
              href="/panier" 
              className="action-circle-btn cart-circle-btn" 
              aria-label="Voir le panier"
              onClick={(e) => {
                e.preventDefault();
                router.push("/panier");
              }}
            >
              <ShoppingBag width={18} height={18} />
              <span className="action-counter badge-purple">{itemCount}</span>
            </Link>

            {/* Dynamic User / Account Pill or CONNEXION Button */}
            {user ? (
              <div className="user-menu-pill">
                <Link href="/profil" className="user-btn" title="Gérer mon profil & paramètres">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name || user.firstName} className="user-nav-avatar-img" />
                  ) : (
                    <span className="user-avatar-badge">
                      {(user.firstName || user.name || "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="user-nav-name">{user.name || user.firstName || "Mon Compte"}</span>
                </Link>
                <button className="logout-link" onClick={() => setShowLogoutModal(true)} title="Se déconnecter">
                  <LogOut width={12} height={12} />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link href="/connexion" className="header-exact-login-btn" title="Se connecter / Créer un compte">
                <span>CONNEXION</span>
                <ArrowRight width={14} height={14} />
              </Link>
            )}
          </div>

          <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
        </div>
      </header>

      {/* Main Page Content */}
      <main className="site-main">{children}</main>

      {/* Luxury Modern Footer */}
      <footer className="fenty-style-footer">
        <div className="container footer-top-grid">
          <div className="footer-col-newsletter">
            <h3 className="footer-col-title">DES ENVIE DE PLUS ? ON EST LÀ !</h3>
            <p className="footer-desc-text">
              Soyez les premiers informés des ventes flash, des nouveautés et des conseils beauté exclusifs ITEXAL.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="footer-forms-stack">
              <div className="footer-input-box">
                <input type="email" placeholder="Adresse e-mail" required />
                <button type="submit" aria-label="Envoyer e-mail">
                  <ArrowRight width={16} height={16} />
                </button>
              </div>
              <div className="footer-input-box">
                <input type="tel" placeholder="Numéro de téléphone (+237)" />
                <button type="submit" aria-label="Envoyer téléphone">
                  <ArrowRight width={16} height={16} />
                </button>
              </div>
            </form>
            <p className="footer-disclaimer">
              En soumettant votre e-mail ou votre numéro, vous acceptez nos Conditions Générales de Vente et notre Politique de Confidentialité.
            </p>
          </div>

          <div className="footer-col-links">
            <h4 className="footer-sub-title">NAVIGATION</h4>
            <ul>
              <li><Link href="/catalogue">Tous les Produits</Link></li>
              <li><Link href="/soins">Soins Visage & Corps</Link></li>
              <li><Link href="/maquillage">Maquillage & Teint</Link></li>
              <li><Link href="/parfums">Parfumerie Haute</Link></li>
              <li><Link href="/capillaire">Soins Capillaires</Link></li>
              <li><Link href="/marques">Nos Marques d'Exception</Link></li>
            </ul>
          </div>

          <div className="footer-col-links">
            <h4 className="footer-sub-title">ESPACE CLIENT</h4>
            <ul>
              <li><Link href="/commandes">Mes Commandes</Link></li>
              <li><Link href="/suivi-commande">Suivi de Colis</Link></li>
              <li><Link href="/notifications">Notifications Privées</Link></li>
              <li><Link href="/favoris">Sélection Privée (Wishlist)</Link></li>
              <li><Link href="/faq">Foire aux Questions</Link></li>
              <li><Link href="/contact">Nous Contacter</Link></li>
            </ul>
          </div>

          <div className="footer-col-links">
            <h4 className="footer-sub-title">ENGAGEMENTS ITEXAL</h4>
            <div className="footer-trust-list">
              <p><ShieldCheck width={15} /> 100% Produits Authentiques</p>
              <p><Truck width={15} /> Livraison sous 24h/48h</p>
              <p><LockKeyhole width={15} /> Paiement MoMo, OM & CB</p>
            </div>
          </div>
        </div>

        <div className="container footer-bottom-row">
          <p>© 2026 ITEXAL BEAUTY CAMEROUN — Tous droits réservés. Haute Cosmétique & Luxe.</p>
          <div className="footer-legal-links">
            <Link href="/cgv">CGV</Link>
            <span>•</span>
            <Link href="/confidentialite">Confidentialité</Link>
            <span>•</span>
            <Link href="/mentions-legales">Mentions Légales</Link>
          </div>
        </div>
      </footer>

      {/* Back To Top Floating Action Button */}
      {showBackToTop && (
        <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Retour en haut">
          <ArrowUp width={18} height={18} />
        </button>
      )}
    </div>
  );
}
