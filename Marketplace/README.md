# 🌸 ITEXAL Beauty — Marketplace Cosmétiques de Luxe · Cameroun

<div align="center">

![ITEXAL Beauty](./public/logo/logo.png)

**Votre expérience beauté haut de gamme au Cameroun**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=googlechrome)](https://web.dev/progressive-web-apps/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase)](https://supabase.com)
[![License](https://img.shields.io/badge/License-Proprietary-red)](./LICENSE)

</div>

---

## 🎯 À Propos

**ITEXAL Beauty** est une marketplace e-commerce spécialisée dans les cosmétiques de luxe pour le marché camerounais. Elle propose une expérience d'achat haut de gamme, inspirée des grandes maisons (Dior, Gucci), avec une identité visuelle raffinée : palette nude/rose poudré, typographie serif élégante et animations soignées.

### ✨ Ce qui rend ITEXAL unique

- 🏆 **Design Luxury** — Esthétique inspirée Dior / Gucci avec micro-animations soignées
- 📱 **PWA** — Installable sur mobile, mode hors-ligne, notifications push
- 🔒 **Sécurisé** — RLS Supabase, validation Zod, protection des routes
- 🚀 **Performant** — SSG Next.js, cache Service Worker, images optimisées
- 🛍️ **Complet** — Panier, commandes, profil éditable, comparateur, blog

---

## 🚀 Démarrage Rapide

```bash
git clone https://github.com/StalkeRalp/ITexal.git
cd ITexal/Marketplace
npm install
npm run dev
# → http://localhost:3000
```

> **Comptes démo** : `admin@itexal.cm` / `admin123` ou n'importe quel email en mode simulation.

---

## 📚 Documentation Complète

| # | Document | Lien |
|---|---|---|
| 1 | 🏗️ Architecture | [`docs/01-architecture.md`](./docs/01-architecture.md) |
| 2 | 🔧 Documentation Technique | [`docs/02-technique.md`](./docs/02-technique.md) |
| 3 | 🚀 Guide Lancement | [`docs/03-guide-lancement.md`](./docs/03-guide-lancement.md) |
| 4 | 📊 Modélisation MCD/MLD | [`docs/04-modelisation-mcd-mld.md`](./docs/04-modelisation-mcd-mld.md) |
| 5 | 🗺️ Feuille de Route Backend | [`docs/05-feuille-de-route-backend.md`](./docs/05-feuille-de-route-backend.md) |
| 6 | 🗄️ Script SQL Supabase | [`docs/06-supabase-schema.sql`](./docs/06-supabase-schema.sql) |

---

## 🗂️ Pages du Site

| Route | Page |
|---|---|
| `/` | 🏠 Accueil |
| `/catalogue` | 🛍️ Catalogue produits |
| `/produit/[id]` | 📦 Fiche produit |
| `/panier` | 🛒 Panier |
| `/commande` | 💳 Formulaire commande |
| `/connexion` | 🔐 Connexion |
| `/inscription` | ✍️ Inscription + OTP |
| `/profil` | 👤 Profil éditable |
| `/blog` | 📖 Blog beauté |
| `/promotions` | 🏷️ Promotions |
| `/admin` | ⚙️ Panel Admin |

---

## 🛠️ Stack Technique

| Couche | Technologie |
|---|---|
| **Frontend** | Next.js 16 App Router + React 19 |
| **Styling** | Vanilla CSS (design system custom luxury) |
| **State** | React Context API (StoreContext) |
| **Données (dev)** | `db.json` + `lib/services/api.js` |
| **Validation** | Zod 4.4 |
| **Icons** | Lucide React |
| **PWA** | Service Worker + Web Manifest |
| **Backend (cible)** | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| **Déploiement** | Vercel (recommandé) |

---

## 🗄️ Intégration Backend (Supabase)

Le frontend est **entièrement terminé et fonctionnel** avec des données simulées. Pour connecter le vrai backend :

1. Exécuter [`docs/06-supabase-schema.sql`](./docs/06-supabase-schema.sql) dans Supabase SQL Editor
2. Ajouter les variables d'environnement dans `.env.local`
3. Modifier uniquement `lib/services/api.js` pour pointer vers Supabase
4. Aucun composant UI à modifier ✅

Voir la feuille de route complète : [`docs/05-feuille-de-route-backend.md`](./docs/05-feuille-de-route-backend.md)

---

## 📱 PWA — Installation

L'application est une **Progressive Web App** complète :

- **Android** : Chrome → Menu ⋮ → "Ajouter à l'écran d'accueil"
- **iOS** : Safari → Bouton Partager → "Sur l'écran d'accueil"
- **Desktop** : Icône d'installation dans la barre d'adresse Chrome/Edge

Fonctionnalités PWA actives :
- ✅ Mode hors-ligne (cache Service Worker)
- ✅ Icônes et écran de démarrage
- ✅ Raccourcis application (Catalogue, Compte, Panier)
- ✅ Notifications push (architecture prête)

---

## 🌿 Structure du Projet

```
Marketplace/
├── app/           # 42 routes Next.js App Router
├── composants/    # Composants partagés
├── lib/           # State, services, validations
├── public/        # Assets statiques + PWA
├── styles/        # Système de design CSS
├── docs/          # Documentation complète
└── db.json        # Base de données simulée
```

---

## 👩‍💻 Développement

```bash
npm run dev    # Serveur de développement
npm run build  # Build de production
npm start      # Serveur de production
```

---

## 🤝 Contribution

Branche principale : `marketplace`

```bash
git checkout marketplace
git pull origin marketplace
# ... vos modifications ...
git add . && git commit -m "feat: votre description"
git push origin marketplace
```

---

## 📄 Licence

Projet propriétaire — ITEXAL Beauty Cameroun © 2026. Tous droits réservés.

---

<div align="center">

Fait avec ❤️ au Cameroun 🇨🇲 par l'équipe **ITEXAL Beauty**

</div>
