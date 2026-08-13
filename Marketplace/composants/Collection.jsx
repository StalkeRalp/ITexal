"use client";

import Link from "next/link";
import { ArrowRight, Grid3X3, LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/composants/ProductCard";
import { BLOG_POSTS } from "@/lib/data/blog";

const heroes = {
  Tous: ["La boutique", "Toute la beauté, choisie avec exigence.", "Explorez notre sélection de maquillage, soins, parfums et soins capillaires pensée pour toutes les routines.", "https://images.pexels.com/photos/31552020/pexels-photo-31552020/free-photo-of-skincare-and-makeup-products-in-elegant-flat-lay.jpeg?auto=compress&w=1600"],
  Maquillage: ["Maquillage", "La couleur, à votre manière.", "Des textures confortables et des teintes expressives pour révéler votre style.", "https://images.pexels.com/photos/33977233/pexels-photo-33977233/free-photo-of-chic-cosmetic-flat-lay-with-makeup-essentials.jpeg?auto=compress&w=1600"],
  Soins: ["Soins", "Prendre soin de sa peau, simplement.", "Nettoyants, sérums et crèmes pour composer une routine claire et sensorielle.", "https://images.pexels.com/photos/31552020/pexels-photo-31552020/free-photo-of-skincare-and-makeup-products-in-elegant-flat-lay.jpeg?auto=compress&w=1600"],
  Parfums: ["Parfums", "Un sillage qui ne ressemble qu'à vous.", "Des fragrances florales, boisées et ambrées à découvrir selon vos envies.", "https://images.pexels.com/photos/34089130/pexels-photo-34089130.jpeg?auto=compress&w=1600"],
  Capillaire: ["Soins Capillaires", "Éclat, force et nutrition pour vos cheveux.", "Des huiles sèches, masques nourrissants et sérums fortifiants pour gainer la fibre capillaire.", "https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&w=1600"],
  Nouveautés: ["Nouveautés", "Il y a du nouveau sur nos étagères…", "Découvrez nos dernières pépites pour apporter un vent de fraîcheur à votre routine beauté.", "https://images.pexels.com/photos/33977233/pexels-photo-33977233/free-photo-of-chic-cosmetic-flat-lay-with-makeup-essentials.jpeg?auto=compress&w=1600"],
  Promotions: ["Offres Privilèges & Ventes Flash", "Les prix doux et coffrets du moment.", "Profitez de remises exclusives sur une sélection de produits de beauté incontournables.", "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&w=1600"],
};

export function Collection({ newOnly = false, promoOnly = false, fixedCategory = null }) {
  const params = useSearchParams();
  const { products } = useStore();

  const initialCategory = fixedCategory || params.get("category") || "Tous";
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("Tous");
  const [stockOnly, setStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3); // 3 or 4 columns
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = ["Tous", ...new Set(products.map((p) => p.category))];
  const brands = ["Tous", ...new Set(products.map((p) => p.brand))];
  const activeCategory = fixedCategory || category;
  const hero = newOnly ? heroes.Nouveautés : heroes[activeCategory] || heroes.Tous;

  const items = useMemo(() => {
    return products
      .filter((product) => {
        const text = [product.name, product.brand, product.category, product.reference, product.shortDescription]
          .join(" ")
          .toLowerCase();
        return (
          (!newOnly || product.new) &&
          (!promoOnly || product.promo) &&
          (activeCategory === "Tous" || product.category === activeCategory) &&
          (brand === "Tous" || product.brand === brand) &&
          (!stockOnly || product.stock > 0) &&
          (!query || text.includes(query.toLowerCase()))
        );
      })
      .sort((a, b) =>
        sort === "price-asc"
          ? a.price - b.price
          : sort === "price-desc"
          ? b.price - a.price
          : sort === "rating"
          ? b.rating - a.rating
          : Number(b.featured) - Number(a.featured)
      );
  }, [products, newOnly, promoOnly, activeCategory, brand, stockOnly, query, sort]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const resetAllFilters = () => {
    if (!fixedCategory) setCategory("Tous");
    setBrand("Tous");
    setStockOnly(false);
    setQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters = (activeCategory !== "Tous" && !fixedCategory) || brand !== "Tous" || stockOnly || query !== "";

  return (
    <main className="collection-page">
      {/* Breadcrumbs */}
      <nav className="collection-breadcrumb container">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <Link href="/catalogue">Catalogue</Link>
        <span>/</span>
        <strong>{hero[0]}</strong>
      </nav>

      {/* Hero Banner Full-Bleed 100vw */}
      <header className="collection-hero collection-hero-fullbleed">
        <div className="collection-hero__media">
          <img src={hero[3]} alt={hero[0]} />
        </div>
        <div className="collection-hero__content">
          <p className="eyebrow">{hero[0]}</p>
          <h1>{hero[1]}</h1>
          <p>{hero[2]}</p>
          <a href="#results" className="btn-pill-primary">
            Découvrir la sélection <ArrowRight width={15} />
          </a>
        </div>
      </header>

      {/* Category Pills Ribbon */}
      <section className="container category-pills-strip">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => {
              if (!fixedCategory) setCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Main Catalog Layout */}
      <section className="collection-layout container" id="results">
        <button
          className={`collection-filter-overlay ${filtersOpen ? "is-open" : ""}`}
          onClick={() => setFiltersOpen(false)}
          aria-label="Fermer les filtres"
        />

        {/* Filters Sidebar */}
        <aside className={`collection-sidebar ${filtersOpen ? "is-open" : ""}`}>
          <div className="collection-sidebar__head">
            <strong>Filtres & Préférences</strong>
            <button onClick={() => setFiltersOpen(false)}>
              <X />
            </button>
          </div>

          <div className="collection-sidebar__body">
            <label className="collection-search">
              <Search />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Rechercher par mot-clé..."
              />
            </label>

            {!fixedCategory && (
              <details className="collection-filter-group" open>
                <summary>Catégories</summary>
                <div>
                  {categories.map((value) => (
                    <label className="collection-check" key={value}>
                      <input
                        type="radio"
                        name="category"
                        checked={category === value}
                        onChange={() => {
                          setCategory(value);
                          setCurrentPage(1);
                        }}
                      />
                      <span />
                      {value}
                    </label>
                  ))}
                </div>
              </details>
            )}

            <details className="collection-filter-group" open>
              <summary>Marques</summary>
              <div>
                {brands.map((value) => (
                  <label className="collection-check" key={value}>
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === value}
                      onChange={() => {
                        setBrand(value);
                        setCurrentPage(1);
                      }}
                    />
                    <span />
                    {value}
                  </label>
                ))}
              </div>
            </details>

            <details className="collection-filter-group" open>
              <summary>Disponibilité</summary>
              <div>
                <label className="collection-check">
                  <input
                    type="checkbox"
                    checked={stockOnly}
                    onChange={(event) => {
                      setStockOnly(event.target.checked);
                      setCurrentPage(1);
                    }}
                  />
                  <span />
                  En stock uniquement
                </label>
              </div>
            </details>
          </div>

          <div className="collection-sidebar__footer">
            <button className="collection-reset" onClick={resetAllFilters}>
              Tout effacer
            </button>
            <button className="btn-pill-primary" onClick={() => setFiltersOpen(false)}>
              Voir les résultats ({items.length})
            </button>
          </div>
        </aside>

        {/* Results Area */}
        <div className="collection-results">
          <div className="collection-mobile-tools">
            <button onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal /> Filtrer les résultats
            </button>
          </div>

          {/* Results Bar Header */}
          <header className="collection-results__head">
            <p>
              <strong>{items.length}</strong> produit{items.length > 1 ? "s" : ""} trouvé{items.length > 1 ? "s" : ""}
            </p>

            <div className="results-controls-right">
              {/* Grid switcher */}
              <div className="grid-switcher-btns">
                <button
                  className={`grid-btn ${gridCols === 3 ? "active" : ""}`}
                  onClick={() => setGridCols(3)}
                  title="Grille 3 colonnes"
                >
                  <Grid3X3 width={16} />
                </button>
                <button
                  className={`grid-btn ${gridCols === 4 ? "active" : ""}`}
                  onClick={() => setGridCols(4)}
                  title="Grille 4 colonnes"
                >
                  <LayoutGrid width={16} />
                </button>
              </div>

              <label className="sort-label">
                Trier par :
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="featured">Sélection ITEXAL</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                  <option value="rating">Avis clients</option>
                </select>
              </label>
            </div>
          </header>

          {/* Active Filter Badges Bar */}
          {hasActiveFilters && (
            <div className="active-filter-chips-bar">
              <span className="chips-title">Filtres actifs :</span>
              {query && (
                <button className="filter-chip-badge" onClick={() => setQuery("")}>
                  Recherche: "{query}" <X width={12} />
                </button>
              )}
              {activeCategory !== "Tous" && !fixedCategory && (
                <button className="filter-chip-badge" onClick={() => setCategory("Tous")}>
                  Catégorie: {activeCategory} <X width={12} />
                </button>
              )}
              {brand !== "Tous" && (
                <button className="filter-chip-badge" onClick={() => setBrand("Tous")}>
                  Marque: {brand} <X width={12} />
                </button>
              )}
              {stockOnly && (
                <button className="filter-chip-badge" onClick={() => setStockOnly(false)}>
                  En stock <X width={12} />
                </button>
              )}
              <button className="clear-all-chip" onClick={resetAllFilters}>
                Tout effacer
              </button>
            </div>
          )}

          {/* Products Grid */}
          {paginatedItems.length ? (
            <>
              <div className={`product-grid collection-product-grid ${gridCols === 4 ? "grid-4cols" : "grid-3cols"}`}>
                {paginatedItems.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <div className="pagination-bar">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="pagination-btn"
                  >
                    « Précédent
                  </button>
                  <div className="pagination-pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`page-number ${currentPage === page ? "active" : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="pagination-btn"
                  >
                    Suivant »
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state-card">
              <h2>Aucun produit ne correspond à votre recherche</h2>
              <p>Essayez de modifier ou de réinitialiser vos filtres pour découvrir d'autres produits.</p>
              <button className="btn-pill-primary" onClick={resetAllFilters}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Beauty Journal Carousel */}
      <section className="collection-journal">
        <div className="container">
          <div className="collection-section-head">
            <p className="eyebrow">CONSEILS & INSPIRATIONS</p>
            <h2>Le Beauty Journal ITEXAL</h2>
            <Link href="/blog">Tous les articles →</Link>
          </div>
          <div className="collection-journal__grid">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article key={post.id}>
                <Link href={`/blog/${post.id}`}>
                  <img src={post.image} alt={post.title} />
                  <p>{post.category}</p>
                  <h3>{post.title}</h3>
                  <span>Lire l'article →</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

