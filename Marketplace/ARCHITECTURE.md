# Architecture front-end

Le projet reprend le périmètre fonctionnel du cahier des charges ITexal pour le front-end.

## Couche Domain
Ne connaît ni le navigateur, ni localStorage, ni le HTML.

## Couche Application
Orchestre les règles métier :
- filtrer le catalogue ;
- ajouter / retirer / modifier le panier ;
- créer une commande ;
- contrôler le stock.

## Couche Infrastructure
Gère les détails techniques actuels :
- `localStorage` ;
- seed de produits ;
- formatage monétaire.

## Couche Presentation
Gère :
- composants HTML ;
- événements DOM ;
- navigation entre pages ;
- rendu des vues.

## Composition Root
`src/shared/container.js` instancie les repositories et injecte les dépendances dans les use cases.

## Évolution vers NestJS
Créer ensuite des repositories HTTP tels que :
- `ApiProductRepository`
- `ApiCartRepository`
- `ApiOrderRepository`
- `ApiAuthRepository`

Ils implémenteront les mêmes contrats mais utiliseront `fetch()` vers l'API NestJS.


## UI services ajoutés

- `IconService.js` : chargement défensif de Lucide + rafraîchissement des icônes.
- `MotionService.js` : reveal au scroll et micro-animation 3D des cartes, avec respect de `prefers-reduced-motion`.

## Données front-end additionnelles

- reviews ;
- newsletter ;
- demandes de produits ;
- articles du Beauty Journal ;
- historique récent.

## Migration backend

Le remplacement principal consistera à substituer les repositories `Local*Repository` par des repositories HTTP :
`ApiProductRepository`, `ApiCartRepository`, `ApiOrderRepository`, `ApiReviewRepository`, `ApiAuthRepository`.
