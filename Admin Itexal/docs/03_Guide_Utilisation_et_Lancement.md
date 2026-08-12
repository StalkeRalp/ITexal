# 🚀 Guide d'Utilisation et de Lancement - Portail Admin ITexal

> **Projet** : ITexal Admin Portal  
> **Environnement de développement & Production**  

---

## 1. Prérequis Système

Pour exécuter et développer le projet ITexal Admin, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** : v18.0.0 ou supérieur (v20+ recommandé)
- **npm** : v9.0.0 ou supérieur
- **Navigateur Web Moderne** : Chrome, Firefox, Edge, Safari (support WebP, LocalStorage & ES6+)

---

## 2. Installation Rapide

### 2.1. Cloner / Accéder aux Dossiers
```bash
# Accéder au dossier principal
cd "/home/stalker/Vidéos/ITexal/Admin Itexal"
```

### 2.2. Installation des Dépendances Frontend
```bash
cd frontend
npm install
```

### 2.3. Installation des Dépendances Backend
```bash
cd ../backend
npm install
```

---

## 3. Lancement des Serveurs de Développement

Pour faire tourner le projet complet, vous devez démarrer le **Backend NestJS** et le **Frontend Next.js**.

### Étape 1 : Démarrer le Backend (NestJS)
Dans un premier terminal :
```bash
cd "/home/stalker/Vidéos/ITexal/Admin Itexal/backend"
npm run start:dev
```
- **Port d'écoute** : `http://localhost:3001` (ou `http://localhost:3002` en secours si le port 3001 est occupé).
- **Prefixe API** : `http://localhost:3001/api`

### Étape 2 : Démarrer le Frontend (Next.js)
Dans un second terminal :
```bash
cd "/home/stalker/Vidéos/ITexal/Admin Itexal/frontend"
npm run dev
```
- **URL d'accès au portail** : `http://localhost:3000`

---

## 4. Identifiants de Connexion par Défaut

Le système est configuré avec des comptes de démonstration pré-hachés avec `bcryptjs` :

| Rôle | Email | Mot de passe |
|---|---|---|
| **Super Administrateur** | `admin@itexal.cm` | `admin123` |
| **Gestionnaire de Stock** | `jean.dupont@itexal.cm` | `Itexal2026!` |

---

## 5. Guide d'Utilisation des Modules Administration

### 5.1. Module Gestion des Marques (`/admin/marques`)
1. **Création d'une Marque** :
   - Cliquez sur **"Ajouter une Marque"**.
   - Glissez-déposez ou sélectionnez le fichier du logo (`PNG`, `JPG`, `WEBP`).
   - Saisissez le nom, le pays d'origine et la description.
   - Cliquez sur **"Enregistrer"**. Le logo sera affiché dans un cadre rond élégant.
2. **Consultation des Détails** :
   - Cliquez sur une carte de marque. Le **panneau latéral droit** s'ouvre avec le logo en grand format, les statistiques de stock et les produits associés.

### 5.2. Module Gestion des Produits (`/admin/produits`)
- Consultation de la grille produits.
- Filtrage par catégorie ou recherche textuelle.
- Modification rapide des stocks et alertes.

### 5.3. Audit & Journal de Sécurité (`/admin/journal`)
- Consultation de toutes les actions réalisées sur la plateforme (connexions, modifications, créations).

---

## 6. Commandes de Build et Vérification

Pour vérifier la conformité du code avant déploiement :

```bash
# Vérification & Build du Backend NestJS
cd backend
npm run build

# Vérification & Build du Frontend Next.js
cd ../frontend
npm run build
```
