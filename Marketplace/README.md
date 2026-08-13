# ITEXAL Beauty — Next.js

Application e-commerce migrée vers **Next.js 16 (App Router)** et React 19.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Pour vérifier la version de production :

```bash
npm run build
npm start
```

## Routes principales

- `/` : accueil
- `/catalogue`, `/nouveautes`, `/promotions` : collections
- `/produit/[id]` : fiche produit liée à sa référence
- `/panier`, `/commande`, `/confirmation/[id]` : tunnel d’achat
- `/connexion`, `/compte`, `/commandes`, `/favoris` : espace client
- `/admin` : back-office

Compte administrateur de démonstration : `admin@itexal.cm` / `admin123`.

## Architecture

- `app/` : routes App Router et layouts
- `components/` : composants React partagés
- `lib/store.jsx` : état métier et persistance locale
- `src/infrastructure/data/` : données de démonstration
- `assets/css/` : design system et animations

Les données restent persistées dans `localStorage`. Une mise en production commerciale nécessite un backend sécurisé pour l’authentification, le paiement, les stocks et les commandes.
