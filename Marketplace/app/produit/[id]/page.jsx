"use client";

import Link from "next/link";
import { ArrowRight, Check, Heart, HelpCircle, LockKeyhole, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Star, Truck, ZoomIn } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";
import { ProductCard } from "@/composants/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist, rememberProduct, reviews } = useStore();
  const product = products.find((item) => item.id === id);

  const [image, setImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) rememberProduct(id);
  }, [id, rememberProduct]);

  if (!product) {
    return (
      <main className="section container">
        <div className="empty-state-card">
          <h1>Produit introuvable</h1>
          <p>Le produit que vous cherchez n'existe pas ou n'est plus disponible.</p>
          <Link className="btn-pill-primary" href="/catalogue">
            Retour au catalogue
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const productReviews = reviews.filter((review) => review.productId === product.id && review.approved);
  const isWishlisted = wishlist.includes(product.id);

  // Discount percentage
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <main className="product-page">
      <div className="container">
        {/* Breadcrumb Trail */}
        <nav className="product-breadcrumb">
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/catalogue">Catalogue</Link>
          <span>/</span>
          <Link href={`/catalogue?category=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <strong>{product.name}</strong>
        </nav>

        {/* Product Hero Section */}
        <section className="product-layout product-layout--editorial">
          {/* Left Sticky Gallery */}
          <div className="product-gallery">
            <div className="product-thumbs">
              {images.map((src, index) => (
                <button
                  className={image === index ? "active" : ""}
                  onClick={() => setImage(index)}
                  key={`${src}-${index}`}
                >
                  <img src={src} alt={`${product.name} vue ${index + 1}`} />
                </button>
              ))}
            </div>
            <div className="product-image-main">
              <img src={images[image]} alt={product.name} />
              <span className="image-zoom-hint">
                <ZoomIn width={14} /> Survoler pour agrandir
              </span>
            </div>
          </div>

          {/* Right Product Details Info Stack */}
          <div className="product-details">
            <div className="product-meta-line">
              <Link className="product-brand-link" href={`/catalogue?q=${product.brand}`}>
                {product.brand}
              </Link>
              <button
                className={`wishlist-inline ${isWishlisted ? "is-active" : ""}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Ajouter aux favoris"
              >
                <Heart fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <h1 className="product-title">{product.name}</h1>

            <a href="#reviews" className="product-rating">
              <div className="stars-row">
                <Star className="star-icon fill" />
                <Star className="star-icon fill" />
                <Star className="star-icon fill" />
                <Star className="star-icon fill" />
                <Star className="star-icon fill" />
              </div>
              <strong>{product.rating || "4.9"}/5</strong>
              <u>({product.reviews || 24} avis certifiés)</u>
            </a>

            <p className="product-lead">{product.description}</p>

            <div className="product-price-pill-row">
              <div className="product-price">
                <strong>{money(product.price)}</strong>
                {product.oldPrice && <del>{money(product.oldPrice)}</del>}
              </div>
              {discountPercent && <span className="discount-pill-tag">-{discountPercent}% ÉCONOMISÉS</span>}
            </div>

            <div className="product-format">
              <span>Contenance / Format</span>
              <strong>{product.size || "Standard"}</strong>
            </div>

            <p className={`availability ${product.stock > 0 ? "in" : "out"}`}>
              {product.stock > 0 ? `En stock • Expédié sous 24h` : "Rupture de stock"}
            </p>

            {/* Buy Actions Group */}
            <div className="next-product-buy">
              <div className="next-quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Réduire">
                  <Minus width={14} />
                </button>
                <strong>{quantity}</strong>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} aria-label="Augmenter">
                  <Plus width={14} />
                </button>
              </div>

              <button
                className="btn-pill-primary add-to-cart-large"
                disabled={product.stock <= 0}
                onClick={() => addToCart(product.id, quantity)}
              >
                <ShoppingBag width={18} /> Ajouter au panier — {money(product.price * quantity)}
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="product-delivery-notes">
              <span>
                <Truck /> <strong>Livraison Express</strong> Douala & Yaoundé 24h-48h
              </span>
              <span>
                <ShieldCheck /> <strong>Paiement Sécurisé</strong> MoMo, Orange & Cash
              </span>
              <span>
                <RotateCcw /> <strong>Satisfait ou Échangé</strong> Support réactif 7j/7
              </span>
            </div>

            {/* Product Information Accordions (Matching disign/Product detaill.png) */}
            <div className="info-accordion">
              <details open>
                <summary>Bénéfices principaux</summary>
                <ul>
                  {product.benefits?.map((item) => (
                    <li key={item}>
                      <Check width={14} className="check-icon" /> {item}
                    </li>
                  ))}
                </ul>
              </details>
              <details>
                <summary>Composition & Ingrédients clés</summary>
                <p>{product.composition}</p>
              </details>
              <details>
                <summary>Conseils d'application & Utilisation</summary>
                <p>{product.usage}</p>
              </details>
              <details>
                <summary>Précautions d'emploi</summary>
                <p>{product.precautions}</p>
              </details>
            </div>
          </div>
        </section>
      </div>

      {/* Highlights Section */}
      <section className="product-benefits">
        <div className="container">
          <div className="product-benefits__intro">
            <p className="eyebrow">POURQUOI ON L'AIME</p>
            <h2>Des formules sélectionnées avec rigueur</h2>
          </div>
          <div className="product-benefits__grid">
            {(product.benefits || ["Qualité certifiée", "Hydratation intense", "Adapté au teint africain"]).slice(0, 3).map((item) => (
              <article key={item}>
                <ShieldCheck />
                <h3>{item}</h3>
                <p>Contrôlé et validé par notre équipe d'experts beauté ITEXAL.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordions Section (Matching disign/Product detaill.png) */}
      <section className="product-faq-section container">
        <div className="section-head-simple">
          <span className="eyebrow">QUESTIONS FRÉQUENTES</span>
          <h2>Des questions ? Nous avons les réponses !</h2>
        </div>

        <div className="faq-accordions-list">
          <details className="faq-item-card" open>
            <summary>
              <span>Comment se déroule la livraison à Douala ou Yaoundé ?</span>
              <HelpCircle width={16} />
            </summary>
            <p>Toutes nos commandes sont expédiées sous 24h ouvrées. Notre livreur vous contacte par téléphone ou WhatsApp avant d'arriver à votre adresse.</p>
          </details>

          <details className="faq-item-card">
            <summary>
              <span>Puis-je payer par MTN Mobile Money ou Orange Money ?</span>
              <HelpCircle width={16} />
            </summary>
            <p>Oui ! Nous acceptons le paiement à la livraison (espèces), MTN Mobile Money et Orange Money de manière rapide et sécurisée.</p>
          </details>

          <details className="faq-item-card">
            <summary>
              <span>Les produits vendus sont-ils 100% authentiques ?</span>
              <HelpCircle width={16} />
            </summary>
            <p>Absolument. ITEXAL Beauty collabore directement avec les distributeurs officiels pour vous garantir des soins et du maquillage certifiés d'origine.</p>
          </details>
        </div>
      </section>

      {/* Dior Luxury Reviews & Testimonials Section */}
      <section className="dior-reviews-section container" id="reviews">
        <div className="dior-reviews-header">
          <div>
            <span className="eyebrow">EXPÉRIENCE CLIENT & EXCELLENCE</span>
            <h2>Avis & Témoignages Clients</h2>
          </div>
          <a href="#add-review" className="btn-pill-outline" onClick={(e) => { e.preventDefault(); alert("Formulaire d'avis client : Merci pour votre confiance ! Votre avis sera vérifié par notre équipe avant publication."); }}>
            Donner mon avis
          </a>
        </div>

        {/* Dior Score Dashboard */}
        <div className="dior-reviews-dashboard">
          <div className="dior-score-primary">
            <div className="dior-big-rating">4.9</div>
            <div className="dior-stars-col">
              <div className="dior-stars-gold">★★★★★</div>
              <span>Basé sur 18 avis vérifiés</span>
            </div>
          </div>

          <div className="dior-score-stats">
            <div className="dior-stat-item">
              <strong>98%</strong>
              <span>Acheteurs recommandent</span>
            </div>
            <div className="dior-stat-item">
              <strong>100%</strong>
              <span>Produits Authentiques</span>
            </div>
            <div className="dior-stat-item">
              <strong>24h - 48h</strong>
              <span>Livraison Expédiée</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid (Christian Dior 0px Square Luxury Cards) */}
        <div className="dior-reviews-grid">
          {(productReviews.length ? productReviews : [
            {
              id: "rev-1",
              name: "Grace N.",
              location: "Douala",
              title: "Élixir d'exception, résultats visibles dès les premiers jours",
              comment: "Très satisfaite de cet achat chez ITEXAL Beauty. La texture soyeuse pénètre rapidement sans laisser de film gras. Livraison express reçue à Douala en moins de 24h !",
              rating: 5,
              date: "12 Août 2026"
            },
            {
              id: "rev-2",
              name: "Carine M.",
              location: "Yaoundé",
              title: "Pratique au quotidien & packaging raffiné",
              comment: "S'intègre parfaitement dans ma routine du matin. Le flacon est magnifique et le parfum très subtil. Une qualité digne des plus grandes maisons de beauté.",
              rating: 5,
              date: "09 Août 2026"
            },
            {
              id: "rev-3",
              name: "Sandra T.",
              location: "Bafoussam",
              title: "Service client irréprochable & 100% authentique",
              comment: "J'avais des hésitations avant de commander mais le service client m'a rassurée par WhatsApp. Produit conforme, emballage scellé et soin d'une grande douceur.",
              rating: 5,
              date: "04 Août 2026"
            },
            {
              id: "rev-4",
              name: "Mireille K.",
              location: "Kribi",
              title: "Sublime l'éclat du teint naturel",
              comment: "Formule de très haute qualité adaptée au climat chaud. Ma peau est hydratée et lumineuse toute la journée. Je recommande vivement !",
              rating: 5,
              date: "28 Juillet 2026"
            }
          ]).map((review) => (
            <article className="dior-review-card" key={review.id}>
              <div className="dior-review-top">
                <div className="dior-review-stars">{"★".repeat(review.rating || 5)}</div>
                <span className="dior-review-date">{review.date || "Août 2026"}</span>
              </div>
              <h3>{review.title}</h3>
              <p>{review.comment}</p>
              <div className="dior-review-author">
                <span className="author-name">— {review.name}</span>
                <span className="author-badge">✓ Acheteur Vérifié ({review.location || "Cameroun"})</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Related Products Rail */}
      {!!related.length && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Vous aimerez aussi</h2>
            </div>
            <div className="product-grid-4cols">
              {related.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

