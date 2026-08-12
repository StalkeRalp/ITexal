# 🛠️ Documentation Technique - Portail Admin ITexal

> **Technologies** : Next.js 16.3, React 19, TypeScript 5.1, NestJS 10, TailwindCSS, HugeIcons  

---

## 1. Structure du Projet

```text
ITexal/Admin Itexal/
├── frontend/                          # Application Web Next.js 16 (App Router)
│   ├── app/                           # Routes de l'application
│   │   ├── admin/                     # Dashboard & sous-modules Admin
│   │   │   ├── marques/page.tsx       # Gestion des Marques (Panneau latéral & Logos)
│   │   │   ├── produits/page.tsx      # Gestion du Catalogue Produits
│   │   │   ├── clients/page.tsx       # Gestion des Clients & Commandes
│   │   │   ├── stocks/page.tsx        # Alerte & Réajustement de Stock
│   │   │   ├── journal/page.tsx       # Journalisation & Audit Logs
│   │   │   └── ...
│   ├── lib/                           # Utilitaires, Contextes & Sécurité
│   │   ├── context/                   # ProduitsContext, LanguageContext, ThemeContext
│   │   ├── securite/                  # Protection XSS, Validation Serveur, Hashing
│   │   └── utilitaires/               # Formatage FCFA, ObtenirImageSecurisee
│   ├── modules/                       # Composants fonctionnels par domaine
│   │   ├── marques/                   # ModalMarqueFormulaire, Types Marque
│   │   ├── clients/                   # ModalClientToutesLesInfos, FicheDetailClient
│   │   └── ...
│   └── types/                         # Interfaces TypeScript centrales (Produit, Marque, etc.)
│
└── backend/                           # API RESTful NestJS 10
    ├── src/
    │   ├── main.ts                    # Bootstrap, Headers HSTS, ValidationPipe, CORS
    │   ├── app.module.ts              # Importation de tous les modules métiers
    │   ├── commun/                    # Gardes (Auth, RBAC) & Décorateurs (@Roles)
    │   └── modules/                   # 14 Micro-modules indépendants (Auth, Produits, Marques...)
    ├── tsconfig.json                  # Strict TypeScript configuration avec types node
    └── package.json                   # Dépendances backend (bcryptjs, jwt, class-validator)
```

---

## 2. Guide des Modules & Composants Frontend

### 2.1. Module Marques (`app/admin/marques/page.tsx`)
- **Disposition UX** : Grille adaptative (3 colonnes par défaut, bascule en 2 colonnes lors de l'ouverture du panneau latéral).
- **Composant `LogoMarque`** :
  ```tsx
  <LogoMarque 
    logo={m.logo} 
    nom={m.nom} 
    size="lg" 
    className={`${theme.badgeLogo} group-hover:scale-105 transition-transform`} 
  />
  ```
  - Forme circulaire (`rounded-full`) avec bordure ultra-fine (`border-slate-200/80`).
  - Fallback automatique sur initiales 2 lettres colorées.
- **Formulaire de Téléversement (`ModalMarqueFormulaire.tsx`)** :
  - Supporte l'upload d'images **PNG, JPG, WEBP** jusqu'à 5 Mo.
  - Conversion automatique en Base64/DataURL persistée dans le contexte et `localStorage`.
  - Suppression du champ "Site Web" obsolète au profit de l'image officielle.

### 2.2. Gestion du Stock & Formatage
- **Utilitaires de formatage (`lib/utilitaires/formatage.ts`)** :
  - `formatPrix` : Formate les prix en FCFA sans duplication de devise (ex: `18 500 FCFA`).
  - `obtenirImageSecurisee` : Retourne l'image du produit ou un placeholder thématique selon sa catégorie.

---

## 3. Spécifications de l'API Backend (Endpoints NestJS)

### 3.1. Authentification & Profil (`/api/auth`)
- `POST /api/auth/connexion` : Authentifie l'utilisateur, vérifie le mot de passe bcrypt, génère le token JWT.
- `GET /api/auth/profil` : Retourne les informations de l'utilisateur connecté (`GardeAuthentification` requis).

### 3.2. Marques & Produits (`/api/marques`, `/api/produits`)
- `GET /api/marques` : Liste toutes les marques actives.
- `POST /api/marques` : Crée une nouvelle marque avec logo base64. `@Roles('Super Administrateur', 'Editeur de Contenu')`.
- `PUT /api/marques/:id` : Modifie les informations et le logo de la marque.
- `DELETE /api/marques/:id` : Supprime une marque. `@Roles('Super Administrateur')`.

### 3.3. Téléversement Media (`/api/admin/televerser-image`)
- `POST /api/admin/televerser-image` : Reçoit les fichiers d'image ou payloads base64 et retourne l'URL d'accès publique.

---

## 4. Gardes et Décorateurs de Sécurité

### `GardeRoles` (`backend/src/commun/gardes/garde-roles.ts`)
```typescript
@Injectable()
export class GardeRoles implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequis = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!rolesRequis) return true;
    const { user } = context.switchToHttp().getRequest();
    return rolesRequis.includes(user.role) || user.role === 'Super Administrateur';
  }
}
```
