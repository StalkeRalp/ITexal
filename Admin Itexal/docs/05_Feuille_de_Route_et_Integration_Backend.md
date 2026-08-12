# 🗺️ Feuille de Route & Connexion Frontend <-> Backend Real API

> **Projet** : ITexal Admin Portal  
> **État du Frontend** : 100% Finalisé, Design System DashStack, Responsive, Panneaux latéraux  
> **Prochaine Étape Majeure** : Remplacement des Stores React In-Memory (`LocalStorage`) par des appels API REST HTTP (`Axios` / `Fetch`) vers le Backend NestJS  

---

## 1. Diagnostic de l'Existant

### 🟢 Ce qui est terminé à 100% :
1. **Design System & UX** :
   - Interface utilisateur moderne, responsive et fluide.
   - Système de panneau latéral "sticky" unifié pour Marques, Produits et Clients.
   - Système de rendu universel des logos avec forme circulaire, bordure ultra-fine et fallback dynamique d'initiales.
2. **Formulaires & Uploader** :
   - Modal de création/édition des marques avec upload drag & drop PNG/JPG/WEBP.
   - Suppression des champs obsolètes (ex: Site Web).
3. **Backend NestJS** :
   - Structure modulaire NestJS avec 14 modules fonctionnels prêts.
   - Middleware de sécurité (HSTS, Headers, CORS, `ValidationPipe`).
   - Authentification JWT & Hachage des mots de passe avec `bcryptjs`.
   - Contrôle d'accès basé sur les rôles RBAC (`GardeRoles`).
   - Endpoint de téléversement d'image `/api/admin/televerser-image`.

---

## 2. Feuille de Route pour l'Intégration du Vrai Backend

Pour connecter le Frontend (React/Next.js) au Backend (NestJS) de manière transparente, voici les étapes d'intégration à réaliser :

### 📡 Étape 1 : Création du Service d'API HTTP Frontend (`lib/api/http-client.ts`)
Créer un client HTTP centralisé (via `axios` ou `fetch`) qui injecte automatiquement le jeton JWT Bearer présent dans les cookies / `localStorage` :

```typescript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('itexal_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

---

### 🔄 Étape 2 : Connecter `ProduitsContext.tsx` aux Endpoints NestJS

Actuellement, `ProduitsContext.tsx` lit/écrit dans `localStorage`. La transition vers l'API s'effectue en remplaçant la logique interne du Provider :

```typescript
// Exemple pour le chargement des Marques depuis le backend :
useEffect(() => {
  async function chargerMarquesDepuisAPI() {
    try {
      const res = await apiClient.get('/marques');
      if (res.data.succes) setMarques(res.data.donnees);
    } catch (err) {
      console.warn("API indisponible, bascule sur le store local de secours.");
    }
  }
  chargerMarquesDepuisAPI();
}, []);
```

---

### 🗄️ Étape 3 : Persistance Base de Données Backend (Prisma / TypeORM)

Actuellement, les services NestJS (`MarquesService`, `ProduitsService`, `UtilisateursService`) utilisent des tableaux en mémoire pour la démonstration. 

Pour passer à une base de données de production (PostgreSQL / MySQL) :
1. Installer **Prisma** ou **TypeORM** dans le backend :
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```
2. Appliquer le schéma relationnel décrit dans `04_Modelisation_MCD_MLD.md`.
3. Remplacer les tableaux en mémoire dans les services NestJS par des appels `this.prisma.marque.findMany()`, `this.prisma.marque.create()`, etc.

---

### ☁️ Étape 4 : Stockage des Fichiers Média (AWS S3 ou Cloudinary)
Remplacer la conversion Base64 locale dans `UploadService` NestJS par un envoi vers un bucket S3 / Cloudinary pour stocker de façon optimale les logos et images HD.

---

## 3. Matrice de Priorités pour le Déploiement Final

| Tâche | Domaine | Priorité | Effort Estimé |
|---|---|---|---|
| Remplacement des tableaux en mémoire backend par ORM (Prisma/TypeORM) | Backend | 🔴 Haute | 2 jours |
| Remplacement du `localStorage` frontend par `apiClient` Axios | Frontend | 🔴 Haute | 1 jour |
| Connexion S3 / Cloudinary pour le stockage des images | Backend | 🟡 Moyenne | 0.5 jour |
| Migration finale Next.js Middleware -> Proxy (`proxy.ts`) | Frontend | 🟢 Basse | 0.5 jour |
