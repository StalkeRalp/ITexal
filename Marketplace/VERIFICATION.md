# Rapport de vérification — ITEXAL Beauty

Validation effectuée sur la version front-end production sans backend.

## Résultats

- 44 pages HTML vérifiées.
- 45 fichiers JavaScript ES Modules vérifiés avec `node --check`.
- 12 produits vérifiés : chacun possède au minimum 3 images distinctes.
- 0 référence locale HTML/CSS/JS manquante.
- 0 import JavaScript local manquant.
- 54 ressources/routes HTTP testées avec un serveur local.
- 0 erreur HTTP locale détectée.
- Pages dynamiques testées côté serveur : fiche produit, article, recherche catalogue et formulaire produit admin.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `sw.js` et page hors-ligne présents.
- Script Linux `START_LINUX_MAC.sh` présent et exécutable.

## Important

Les images, vidéos Pexels et le script CDN Lucide sont des ressources externes et nécessitent une connexion Internet. Leur disponibilité dépend donc des services externes, pas du code local du projet.

Le point d’entrée est :

```text
index.html
```

Sous Linux :

```bash
chmod +x START_LINUX_MAC.sh
./START_LINUX_MAC.sh
```

Puis ouvrir :

```text
http://127.0.0.1:8000/index.html
```
