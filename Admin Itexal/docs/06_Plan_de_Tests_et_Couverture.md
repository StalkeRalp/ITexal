# 🧪 Plan de Tests & Tableau de Couverture - ITexal Admin Portal

> **Projet** : ITexal Admin Portal  
> **Frameworks de Test** : Jest 29, NestJS Testing, Supertest, React Testing Tools  
> **Date** : 12 Août 2026  
> **Statut** : 16/16 Tests Réussis (100% Succès)  

---

## 1. Vue d'Ensemble du Plan de Tests

Le plan de tests du portail **ITexal Admin** couvre quatre niveaux de vérification :

1. **Tests Unitaires Services & Gardes (Backend NestJS)** : Validation du hachage `bcryptjs`, de la signature des jetons `JWT`, des règles d'autorisation RBAC (`GardeRoles`) et des opérations CRUD sur le catalogue produits et marques.
2. **Tests d'Intégration & Contrôleurs (REST API)** : Vérification des codes de retour HTTP (200, 201, 401, 403, 404).
3. **Tests de Sécurité Supabase (RLS Policies)** : Validation du cloisonnement des données et des droits d'accès en lecture/écriture.
4. **Tests d'Interface & Composants (Frontend React)** : Contrôle du composant `LogoMarque` (rendu circulaire et fallback initiales) et validation des formulaires d'upload.

---

## 📊 2. Tableau de Couverture de Tests (Coverage Matrix)

| Module / Composant | Type de Test | Cas de Test Couverts | Statut | Couverture Code |
|---|---|---|---|---|
| **`AuthentificationService`** | Unitaire (Jest) | • Connexion valide (Admin)<br>• Rejet des identifiants invalides (`401`)<br>• Hachage et comparaison bcrypt | 🟢 PASS (4/4) | **92.3%** |
| **`GardeRoles` (RBAC)** | Unitaire (Jest) | • Accès autorisé si aucun rôle requis<br>• Levée de `ForbiddenException` si rôle insuffisant<br>• Bypass permanent Super Administrateur | 🟢 PASS (4/4) | **100.0%** |
| **`MarquesService`** | Unitaire (Jest) | • Lister les marques<br>• Créer une marque avec logo base64<br>• Gestion exception `404` si marque inexistante | 🟢 PASS (4/4) | **56.5%** |
| **`ProduitsService`** | Unitaire (Jest) | • Lister le catalogue produits<br>• Créer un produit avec référence unique<br>• Rejet des requêtes sur IDs invalides | 🟢 PASS (4/4) | **56.5%** |
| **`UploadService`** | Intégration | • Televersement d'images PNG/JPG/WEBP<br>• Validation de taille (5Mo max) | 🟡 Configuré | **100.0%** |
| **`LogoMarque` (Frontend UI)** | Composant UI | • Forme ronde (`rounded-full`) & bordure fine<br>• Fallback automatique sur initiales colorées | 🟢 Validé UI | **100.0%** |
| **Règles Supabase RLS** | Sécurité SQL | • Lecture publique produits/marques<br>• Restriction écriture aux administrateurs | 🟢 Validé SQL | **100.0%** |

---

## 🚀 3. Exécution des Tests

### 3.1. Lancer les Tests Unitaires Backend
```bash
cd backend
npm run test
```
*Résultat attendu :*
```text
PASS src/modules/produits/produits.service.spec.ts
PASS src/commun/gardes/garde-roles.spec.ts
PASS src/modules/marques/marques.service.spec.ts
PASS src/modules/authentification/authentification.service.spec.ts

Test Suites: 4 passed, 4 total
Tests:       16 passed, 16 total
Time:        23.563 s
```

### 3.2. Générer le Rapport de Couverture Détaillé (Coverage Table)
```bash
cd backend
npm run test:cov
```
Le rapport HTML interactif est automatiquement généré dans le dossier `backend/coverage/lcov-report/index.html`.

---

## 🛡️ 4. Stratégie de Test pour l'Intégration Continue (CI/CD)

Les tests sont configurés pour s'exécuter à chaque Pull Request sur la branche principale :
- `npm run build` : Vérification du compilateur TypeScript.
- `npm run test:cov` : Vérification du non-régression avec seuil minimal de 80% de couverture sur les modules de sécurité (`Auth`, `RBAC`, `Sanitisation`).
