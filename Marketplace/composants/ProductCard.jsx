"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";

export function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const images = product.images?.length ? product.images : [product.image];
  const href = `/produit/${encodeURIComponent(product.id)}`;
  const interactive = (target) => target.closest("a,button,input,select,textarea,label");
  const isWishlisted = wishlist.includes(product.id);

  // Discount percentage calculation
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  // Social proof buyers count tag (inspired by disign/All Products.png)
  const buyersCount = 300 + (parseInt(product.id, 36) % 450 || 180);

  return (
    <article
      className="product-card Image2-product-card"
      data-product-id={product.id}
      tabIndex="0"
      role="link"
      aria-label={`Voir ${product.name}, référence ${product.reference}`}
      onClick={(event) => {
        if (!interactive(event.target)) router.push(href);
      }}
    >
      <div className="product-media studio-media-wrap">
        <Link className="product-media-link" href={href}>
          <img className="product-img product-img-main" loading="lazy" src={images[0]} alt={product.name} />
          <img className="product-img product-img-alt" loading="lazy" src={images[1] || images[0]} alt="" aria-hidden="true" />
        </Link>

        {/* Top Badges (Image 2 style) */}
        <div className="studio-badge-stack">
          {product.new ? (
            <span className="studio-tag-pill">NOUVEAU</span>
          ) : product.bestseller || product.rating >= 4.8 ? (
            <span className="studio-tag-pill">BESTSELLER</span>
          ) : discountPercent ? (
            <span className="studio-tag-pill sale">-{discountPercent}%</span>
          ) : null}
        </div>

        {/* Wishlist Circle Floating Button (Image 2 style) */}
        <button
          type="button"
          className={`wishlist-circle-btn ${isWishlisted ? "is-active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Ajouter aux favoris"
        >
          <Heart fill={isWishlisted ? "#2b1735" : "none"} color={isWishlisted ? "#2b1735" : "#444444"} width={16} height={16} />
        </button>

        {/* Quick Add Hover Button */}
        <button
          type="button"
          className="studio-quick-add-btn"
          disabled={product.stock <= 0}
          onClick={() => addToCart(product.id)}
        >
          <ShoppingBag width={14} height={14} /> Ajout Rapide
        </button>
      </div>

      <div className="product-info studio-info-box">
        <span className="product-brand-tag">{product.brand || "ITEXAL BEAUTY"}</span>
        <h3 className="studio-product-title">
          <Link href={href}>{product.name}</Link>
        </h3>
        
        <div className="studio-rating-row">
          <div className="studio-stars">★★★★★</div>
          <span className="reviews-count">({product.reviews || 42})</span>
        </div>

        <div className="studio-bottom-line">
          <div className="studio-price-box">
            <strong className="studio-price">{money(product.price)}</strong>
            {product.oldPrice && <del className="studio-old-price">{money(product.oldPrice)}</del>}
          </div>
          <div className="studio-buyers-tag">+{buyersCount} acheteurs</div>
        </div>
      </div>
    </article>
  );
}

