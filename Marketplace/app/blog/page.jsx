"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Clock, BookOpen } from "lucide-react";
import { useState } from "react";
import { BLOG_POSTS } from "@/lib/data/blog";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("TOUS");

  const categories = ["TOUS", "SOINS", "PARFUMS", "MAQUILLAGE"];

  const filteredPosts = activeCategory === "TOUS"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category.toUpperCase() === activeCategory);

  return (
    <main className="blog-page-main">
      {/* Luxury Dior / Gucci Header */}
      <header className="blog-hero-luxury">
        <div className="container">
          <span className="banner-eyebrow">MAISON ITEXAL — EDITORIAL & ROUTINES</span>
          <h1>Journal & Secrets de Beauté</h1>
          <p>
            Inspirations Haute Couture, rituels de soins ciblés et secrets de fragrances d'exception pour révéler votre éclat naturel.
          </p>

          {/* Interactive Category Filter Bar */}
          <div className="orders-filter-bar" style={{ marginTop: "30px", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`orders-tab ${activeCategory === cat ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Blog Animated Grid Section */}
      <section className="section container">
        <div className="blog-grid-luxury">
          {filteredPosts.map((post, idx) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`} 
              className="blog-card-dior"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="blog-img-container">
                <img src={post.image} alt={post.title} />
                <span className="blog-read-badge">
                  <Clock width={12} style={{ display: "inline", marginRight: "4px" }} />
                  {post.readTime}
                </span>
              </div>

              <div className="blog-body-dior">
                <span className="blog-cat-tag">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>

                <div className="blog-read-link">
                  Lire l'article complet <ArrowRight width={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
