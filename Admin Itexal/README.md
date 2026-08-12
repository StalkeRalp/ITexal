# 🏛️ ITexal Admin Portal - Dashboard & API Management System

Welcome to the **ITexal Admin Portal**, a modern, high-performance, and secure administrative command center for managing products, brands, inventory, customer accounts, sales orders, promotions, and system audit logs for the ITexal dermo-cosmetics ecosystem.

---

## 📌 Sommaire & Navigation Rapide

- [📖 1. Présentation du Projet](#-1-présentation-du-projet)
- [🛠️ 2. Stack Technique](#️-2-stack-technique)
- [📂 3. Structure du Répertoire](#-3-structure-du-répertoire)
- [🗺️ 4. Carte de la Documentation Développeur (`/docs`)](#️-4-carte-de-la-documentation-développeur-docs)
- [🧪 5. Tests Unitaires & Couverture](#-5-tests-unitaires--couverture)
- [🚀 6. Guide de Démarrage Rapide](#-6-guide-de-démarrage-rapide)
- [🔑 7. Identifiants de Démonstration](#-7-identifiants-de-démonstration)
- [🔒 8. Sécurité & Bonnes Pratiques](#-8-sécurité--bonnes-pratiques)
- [🎯 9. Prochaines Étape : Connexion API Real Backend](#-9-prochaines-étape--connexion-api-real-backend)

---

## 📖 1. Présentation du Projet

Le portail d'administration **ITexal** permet la gestion complète de la chaîne de valeur e-commerce et dermo-cosmétique :

- **Catalogue & Marques** : Gestion des marques partenaires, affichage universel des logos avec recadrage circulaire (`LogoMarque`) et fallback automatique sur initiales colorées, fiches détaillées dans des panneaux latéraux interactifs (*Right Side Panel*).
- **Stocks & Alertes** : Suivi des réapprovisionnements, notifications de rupture et gestion des seuils d'alerte.
- **Clients & Commandes** : Panneau d'analyse client à 360°, suivi des livraisons et des paiements (Mobile Money / Orange Money).
- **Sécurité & Audit** : Hachage fort des mots de passe (`bcryptjs`), tokens JWT, rôles RBAC dynamiques et journalisation d'audit des événements sensibles.

---

## 🛠️ 2. Stack Technique

| Domaine | Technologie | Rôle / Description |
|---|---|---|
| **Frontend Framework** | **Next.js 16.3 (Turbopack)** | React 19 App Router, SSR/CSR, DashStack Design System |
| **Styling** | **TailwindCSS & Vanilla CSS** | Design responsive, glassmorphism, animations fluides |
| **Icônes** | **HugeIcons React** | Kit d'icônes vectorielles modernes |
| **Backend Framework** | **NestJS 10** | Architecture Node.js modulaire basée sur TypeScript |
| **Testing Engine** | **Jest 29 & Supertest** | Framework de tests unitaires et couverture de code |
| **Sécurité** | **bcryptjs, JWT, HSTS** | Hachage de mots de passe, gardes RBAC, en-têtes HTTP de sécurité |
| **Validation** | **class-validator / DTOs** | Sanitisation et validation serveur des entrées utilisateur |

---

## 📂 3. Structure du Répertoire

```text
ITexal/Admin Itexal/
├── README.md                            # 👈 Guide principal Développeur
│
├── docs/                                # 📚 Dossier Central de Documentation
│   ├── 01_Architecture_Systeme.md       # Architecture globale & Matrice de Sécurité
│   ├── 02_Documentation_Technique.md    # Composants, Modules Frontend & Endpoints Backend
│   ├── 03_Guide_Utilisation_et_Lancement.md # Prerequis, Installation & Déploiement
│   ├── 04_Modelisation_MCD_MLD.md       # Modèle Conceptuel (ERD) & Modèle Logique SQL
│   ├── 05_Feuille_de_Route_et_Integration_Backend.md # Prochaines étapes d'intégration API
│   ├── 06_Plan_de_Tests_et_Couverture.md # 🧪 Plan de tests et tableau de couverture
│   └── schema_supabase_itexal.sql       # 🗄️ Schéma complet Supabase PostgreSQL + RLS
│
├── frontend/                            # 🖥️ Application Client Next.js 16
│   ├── app/admin/                       # Routes des pages d'administration (/marques, /produits, etc.)
│   ├── lib/context/                     # Contextes d'état (ProduitsContext, LanguageContext, ThemeContext)
│   ├── lib/utilitaires/                 # Formatage FCFA, ObtenirImageSecurisee
│   ├── modules/                         # Modals et composants métier par domaine
│   └── types/                           # Interfaces TypeScript centrales (Marque, Produit, etc.)
│
└── backend/                             # ⚙️ Application Serveur NestJS 10
    ├── src/main.ts                      # En-têtes HSTS, CORS & ValidationPipe
    ├── src/app.module.ts                # App Module racine (Importation des 14 modules)
    ├── src/commun/                      # Gardes de sécurité (GardeAuthentification, GardeRoles)
    └── src/modules/                     # Modules NestJS (Auth, Produits, Marques, Upload...)
```

---

## 🗺️ 4. Carte de la Documentation Développeur (`/docs`)

Pour toute recherche spécifique, consultez les documents dédiés dans le dossier `/docs` :

1. **Vous cherchez l'architecture logicielle ou les flux de sécurité ?**  
   👉 Consultez [`docs/01_Architecture_Systeme.md`](docs/01_Architecture_Systeme.md)

2. **Vous cherchez la liste des endpoints API, les props de composants UI ou les utilitaires ?**  
   👉 Consultez [`docs/02_Documentation_Technique.md`](docs/02_Documentation_Technique.md)

3. **Vous voulez installer, faire tourner ou builder le projet sur une nouvelle machine ?**  
   👉 Consultez [`docs/03_Guide_Utilisation_et_Lancement.md`](docs/03_Guide_Utilisation_et_Lancement.md)

4. **Vous cherchez le schéma de la base de données (MCD / MLD / Diagramme ERD Mermaid) ?**  
   👉 Consultez [`docs/04_Modelisation_MCD_MLD.md`](docs/04_Modelisation_MCD_MLD.md)

5. **Vous voulez savoir ce qu'il reste à faire pour connecter le Frontend au vrai Backend ?**  
   👉 Consultez [`docs/05_Feuille_de_Route_et_Integration_Backend.md`](docs/05_Feuille_de_Route_et_Integration_Backend.md)

6. **Vous voulez voir la couverture des tests et lancer les suites de tests ?**  
   👉 Consultez [`docs/06_Plan_de_Tests_et_Couverture.md`](docs/06_Plan_de_Tests_et_Couverture.md)

---

## 🧪 5. Tests Unitaires & Couverture

L'application intègre une suite de tests unitaires complète sous **Jest 29** :

```bash
# Lancer les tests unitaires backend
cd backend
npm run test

# Générer le tableau de couverture de code (Coverage Table)
npm run test:cov
```
> **Résultat actuel** : **16/16 tests réussis (100% de taux de succès)**.

---

## 🚀 6. Guide de Démarrage Rapide

### Démarrer le Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```
> Le serveur backend écoute sur **`http://localhost:3001/api`** (ou `3002` si 3001 est occupé).

### Démarrer le Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
> Accédez à l'application web sur **`http://localhost:3000`**.

---

## 🔑 7. Identifiants de Démonstration

| Rôle | Email | Mot de Passe |
|---|---|---|
| **Super Administrateur** | `admin@itexal.cm` | `admin123` |
| **Gestionnaire de Stock** | `jean.dupont@itexal.cm` | `Itexal2026!` |

---

## 🔒 8. Sécurité & Bonnes Pratiques

- **Jamais de mot de passe en clair** : Utilisation de `bcryptjs` avec 10 rounds de salage.
- **Protection XSS** : Les données affichées côté client sont sanitisées via `nettoyerChaineXSS`.
- **RBAC Strict** : Les routes sensibles du backend sont protégées par `@UseGuards(GardeAuthentification, GardeRoles)`.

---

## 🎯 9. Prochaines Étape : Connexion API Real Backend

Le Frontend est **100% fonctionnel et visuellement achevé**. Pour passer en production :
1. Remplacer les lectures `localStorage` dans `ProduitsContext.tsx` par un client HTTP (`Axios`) vers l'API NestJS.
2. Installer un ORM (ex: **Prisma**) dans NestJS pour lier les controllers aux tables PostgreSQL/MySQL.
3. Raccorder l'endpoint `/api/admin/televerser-image` à un bucket de stockage cloud (AWS S3 / Cloudinary).

---

*Développé avec soin par l'équipe ITexal.*
