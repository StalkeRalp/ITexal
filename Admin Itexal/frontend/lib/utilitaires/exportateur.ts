/**
 * Service d'exportation de données (CSV & PDF)
 * Cosmetic Admin - ITexal
 */

export interface MetriqueExport {
  label: string;
  valeur: string;
}

export interface CommandeClientPDF {
  reference: string;
  dateCommande: string;
  articlesResume: string;
  methodePaiement: string;
  montantTotal: number;
  statut: string;
}

export interface ParametresFicheClientPDF {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  genre: string;
  typeGamme: string;
  statut: string;
  totalDepense: number;
  totalCommandes: number;
  dateInscrit: string;
  avatar?: string;
  metier?: string;
  commandes?: CommandeClientPDF[];
}

export interface ParametresStatistiquesProduitPDF {
  produitNom: string;
  reference: string;
  nomCategorie: string;
  marque: string;
  prixUnitaire: number;
  stockRestant: number;
  image?: string;
  quantiteVendue: number;
  chiffreAffairesGenere: number;
  nombreCommandes: number;
  tauxEcoulement: number;
  commandesHistorique: Array<{
    reference: string;
    dateCommande: string;
    nomClient: string;
    quantite: number;
    sousTotal: number;
    statut: string;
  }>;
}

/**
 * Exporte un tableau de données sous forme de fichier CSV (UTF-8 avec BOM)
 */
export function exporterCSV(
  nomFichier: string,
  enTetes: string[],
  lignes: (string | number | boolean)[][]
) {
  const nomComplet = nomFichier.endsWith(".csv") ? nomFichier : `${nomFichier}.csv`;

  const echapperCSV = (val: string | number | boolean): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const ligneEnTetes = enTetes.map(echapperCSV).join(";");
  const lignesDonnees = lignes.map((row) => row.map(echapperCSV).join(";")).join("\n");

  const contenuCSV = "\uFEFF" + ligneEnTetes + "\n" + lignesDonnees;

  const blob = new Blob([contenuCSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", nomComplet);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Génère et affiche un document PDF d'un rapport global avec Logo ITexal Officiel
 */
export function exporterRapportPDF(
  titre: string,
  sousTitre: string,
  metriques: MetriqueExport[],
  enTetes: string[],
  lignes: (string | number)[][]
) {
  const fenetre = window.open("", "_blank");
  if (!fenetre) return;

  const dateFormatee = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>${titre} - ITexal Cosmetic Admin</title>
      <style>
        @page { size: A4 portrait; margin: 15mm; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background: #fff; margin: 0; padding: 20px; font-size: 12px; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #5B63F6; padding-bottom: 15px; margin-bottom: 20px; }
        .logo-title { display: flex; align-items: center; gap: 16px; }
        .logo-img { height: 52px; width: auto; object-fit: contain; }
        .title-group h1 { font-size: 18px; margin: 0; font-weight: 800; color: #0f172a; text-transform: uppercase; tracking-tight; }
        .title-group p { font-size: 11px; margin: 2px 0 0 0; color: #64748b; }
        .meta-date { text-align: right; font-size: 10px; color: #64748b; }
        .metrics-grid { display: grid; grid-template-columns: repeat(${Math.min(metriques.length, 4)}, 1fr); gap: 12px; margin-bottom: 20px; }
        .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; }
        .metric-label { font-size: 9px; text-transform: uppercase; color: #64748b; font-weight: 700; }
        .metric-value { font-size: 16px; font-weight: 900; color: #5B63F6; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #5B63F6; color: white; text-align: left; padding: 9px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-size: 11px; color: #334155; }
        tr:nth-child(even) { background: #f8fafc; }
        .footer { margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo-title">
          <img src="/Admin Cosmetic.png" alt="Logo ITexal Cosmetic" class="logo-img" onError="this.style.display='none';" />
          <div class="title-group">
            <h1>${titre}</h1>
            <p>${sousTitre}</p>
          </div>
        </div>
        <div class="meta-date">
          <strong>ITEXAL COSMETIC ADMIN</strong><br>
          Généré le : ${dateFormatee}
        </div>
      </div>

      ${
        metriques.length > 0
          ? `
        <div class="metrics-grid">
          ${metriques
            .map(
              (m) => `
            <div class="metric-card">
              <div class="metric-label">${m.label}</div>
              <div class="metric-value">${m.valeur}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      <table>
        <thead>
          <tr>
            ${enTetes.map((h) => `<th>${h}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${lignes
            .map(
              (row) => `
            <tr>
              ${row.map((cell) => `<td>${cell}</td>`).join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="footer">
        <span>Rapport Officiel ITexal Cosmetic Admin • Système de Gestion Centralisée</span>
        <span>Page 1 sur 1</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  fenetre.document.write(html);
  fenetre.document.close();
}

/**
 * Génère un Bon de Commande / Facture PDF professionnel avec Logo Officiel
 */
export function exporterBonDeCommandePDF(commande: {
  numeroCommande: string;
  creeLe: string;
  statut: string;
  nomClient: string;
  emailClient: string;
  telephoneClient: string;
  adresseLivraison: string;
  villeLivraison: string;
  modePaiement: string;
  statutPaiement: string;
  montantTotal: number;
  fraisLivraison?: number;
  articles: Array<{
    nomProduit: string;
    prixUnitaire: number;
    quantite: number;
  }>;
}) {
  const fenetre = window.open("", "_blank");
  if (!fenetre) return;

  const dateFormatee = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatPrix = (val: number) =>
    new Intl.NumberFormat("fr-FR").format(val) + " FCFA";

  const sousTotal = commande.articles.reduce(
    (sum, a) => sum + a.prixUnitaire * a.quantite,
    0
  );
  const frais = commande.fraisLivraison || 1500;

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Bon de Commande ${commande.numeroCommande} - ITexal</title>
      <style>
        @page { size: A4 portrait; margin: 15mm; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background: #fff; margin: 0; padding: 20px; font-size: 12px; }
        .invoice-box { max-width: 800px; margin: auto; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #5B63F6; padding-bottom: 20px; margin-bottom: 25px; }
        .brand { display: flex; align-items: center; gap: 16px; }
        .brand-logo-img { height: 56px; width: auto; object-fit: contain; }
        .brand-info h2 { margin: 0; font-size: 20px; font-weight: 900; color: #0f172a; }
        .brand-info p { margin: 2px 0 0 0; font-size: 11px; color: #64748b; }
        .doc-title { text-align: right; }
        .doc-title h1 { margin: 0; font-size: 18px; color: #5B63F6; font-weight: 900; text-transform: uppercase; }
        .doc-title p { margin: 4px 0 0 0; font-size: 11px; font-weight: 700; color: #475569; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; }
        .card-title { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #5B63F6; margin-bottom: 8px; letter-spacing: 0.5px; }
        .card-line { margin-bottom: 5px; font-size: 11px; color: #334155; }
        .card-line strong { font-weight: 700; color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        th { background: #5B63F6; color: white; text-align: left; padding: 10px 12px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 11px; }
        tr:nth-child(even) { background: #f8fafc; }
        .totals-container { display: flex; justify-content: flex-end; margin-bottom: 30px; }
        .totals-box { width: 280px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 11px; color: #475569; }
        .total-row.grand { border-top: 2px solid #5B63F6; padding-top: 10px; margin-top: 10px; font-size: 14px; font-weight: 900; color: #0f172a; }
        .total-row.grand .amount { color: #5B63F6; }
        .footer-terms { border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; font-size: 10px; color: #94a3b8; }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <div class="header">
          <div class="brand">
            <img src="/Admin Cosmetic.png" alt="Logo ITexal Cosmetic" class="brand-logo-img" onError="this.style.display='none';" />
            <div class="brand-info">
              <h2>ITexal Cosmetic</h2>
              <p>Produits de soin & beauté cosmétique • Douala, Cameroun</p>
            </div>
          </div>
          <div class="doc-title">
            <h1>BON DE COMMANDE</h1>
            <p>N° ${commande.numeroCommande}</p>
            <p style="font-weight: normal; color: #64748b;">Date: ${commande.creeLe || dateFormatee}</p>
          </div>
        </div>

        <div class="details-grid">
          <div class="card">
            <div class="card-title">Informations Client</div>
            <div class="card-line"><strong>Nom & Prénom:</strong> ${commande.nomClient}</div>
            <div class="card-line"><strong>Email:</strong> ${commande.emailClient}</div>
            <div class="card-line"><strong>Téléphone:</strong> ${commande.telephoneClient}</div>
            <div class="card-line"><strong>Adresse:</strong> ${commande.adresseLivraison}, ${commande.villeLivraison}</div>
          </div>

          <div class="card">
            <div class="card-title">Statut & Règlement</div>
            <div class="card-line"><strong>Statut Commande:</strong> ${commande.statut}</div>
            <div class="card-line"><strong>Mode de Paiement:</strong> ${commande.modePaiement}</div>
            <div class="card-line"><strong>Statut Paiement:</strong> ${commande.statutPaiement}</div>
            <div class="card-line"><strong>Émis par:</strong> Administration ITexal</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Article / Désignation Produit</th>
              <th style="text-align: right;">Prix Unitaire</th>
              <th style="text-align: center;">Qté</th>
              <th style="text-align: right;">Total FCFA</th>
            </tr>
          </thead>
          <tbody>
            ${commande.articles
              .map(
                (art) => `
              <tr>
                <td><strong>${art.nomProduit}</strong></td>
                <td style="text-align: right;">${formatPrix(art.prixUnitaire)}</td>
                <td style="text-align: center;">${art.quantite}</td>
                <td style="text-align: right; font-weight: bold;">${formatPrix(art.prixUnitaire * art.quantite)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="totals-container">
          <div class="totals-box">
            <div class="total-row">
              <span>Sous-total articles :</span>
              <strong>${formatPrix(sousTotal)}</strong>
            </div>
            <div class="total-row">
              <span>Frais de livraison :</span>
              <strong>${formatPrix(frais)}</strong>
            </div>
            <div class="total-row grand">
              <span>TOTAL NET :</span>
              <span class="amount">${formatPrix(commande.montantTotal)}</span>
            </div>
          </div>
        </div>

        <div class="footer-terms">
          <p><strong>Merci pour votre commande chez ITexal Cosmetic !</strong></p>
          <p>Document officiel valant bon de commande et attestation d'achat. Pour toute question, contactez contact@itexal.com.</p>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  fenetre.document.write(html);
  fenetre.document.close();
}

/**
 * Génère une Fiche Client Détaillée en PDF avec Photo Client, Logo Officiel et mise en page haute qualité
 */
export function exporterFicheClientPDF(client: ParametresFicheClientPDF) {
  const fenetre = window.open("", "_blank");
  if (!fenetre) return;

  const dateFormatee = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatPrix = (val: number) =>
    new Intl.NumberFormat("fr-FR").format(val) + " FCFA";

  const initiales = client.nom
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const photoHtml = client.avatar
    ? `<img src="${client.avatar}" alt="${client.nom}" class="avatar-photo" />`
    : `<div class="avatar-fallback">${initiales}</div>`;

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Fiche Signalétique Client - ${client.nom} - ITexal</title>
      <style>
        @page { size: A4 portrait; margin: 15mm; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background: #fff; margin: 0; padding: 20px; font-size: 12px; }
        .box { max-width: 800px; margin: auto; }
        
        /* Header */
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #5B63F6; padding-bottom: 15px; margin-bottom: 20px; }
        .brand { display: flex; align-items: center; gap: 16px; }
        .logo-img { height: 54px; width: auto; object-fit: contain; }
        .header-title h1 { margin: 0; font-size: 18px; color: #0f172a; font-weight: 900; }
        .header-title p { margin: 2px 0 0 0; font-size: 11px; color: #64748b; }
        
        /* Client Hero Banner with Photo */
        .hero-banner { display: flex; align-items: center; gap: 20px; background: linear-gradient(135deg, #F4F5FF 0%, #EBEFFE 100%); border: 1px solid #DCE3FF; border-radius: 16px; padding: 20px; margin-bottom: 20px; }
        .avatar-container { width: 90px; height: 90px; border-radius: 50%; border: 3px solid #5B63F6; overflow: hidden; background: #fff; display: flex; items-center; justify-center; shrink-0; box-shadow: 0 4px 12px rgba(91, 99, 246, 0.2); }
        .avatar-photo { width: 100%; height: 100%; object-fit: cover; }
        .avatar-fallback { font-size: 28px; font-weight: 900; color: #5B63F6; text-align: center; line-height: 90px; width: 100%; }
        .hero-details h2 { margin: 0; font-size: 22px; font-weight: 900; color: #0f172a; }
        .hero-details p { margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-weight: 600; }
        .badges-row { display: flex; gap: 8px; margin-top: 10px; }
        .badge { padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        .badge-purple { background: #5B63F6; color: white; }
        .badge-active { background: #10B981; color: white; }
        .badge-gender { background: #E0E7FF; color: #3730A3; }

        /* KPI Cards Grid */
        .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
        .kpi-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center; }
        .kpi-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; }
        .kpi-value { font-size: 18px; font-weight: 900; color: #5B63F6; margin-top: 4px; }

        /* Two columns Info Grid */
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
        .card-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #5B63F6; margin-bottom: 12px; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .line { margin-bottom: 8px; font-size: 11px; color: #334155; }
        .line strong { font-weight: 700; color: #0f172a; }

        /* Orders Table */
        .table-title { font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #5B63F6; color: white; text-align: left; padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-size: 11px; color: #334155; }
        tr:nth-child(even) { background: #f8fafc; }

        /* Footer */
        .footer { margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="box">
        <!-- Official Header with Logo -->
        <div class="header">
          <div class="brand">
            <img src="/Admin Cosmetic.png" alt="Logo ITexal Cosmetic" class="logo-img" onError="this.style.display='none';" />
            <div class="header-title">
              <h1>FICHE SIGNALÉTIQUE CLIENT</h1>
              <p>ITexal Cosmetic Admin • Extrait officiel du dossier client</p>
            </div>
          </div>
          <div style="text-align: right; font-size: 10px; color: #64748b;">
            <strong>ITEXAL COSMETIC ADMIN</strong><br>
            Date d'émission : ${dateFormatee}
          </div>
        </div>

        <!-- Client Hero Banner with Photo -->
        <div class="hero-banner">
          <div class="avatar-container">
            ${photoHtml}
          </div>
          <div class="hero-details">
            <h2>${client.nom}</h2>
            <p>${client.metier || "Client Privilégié VIP"} • Inscrit(e) le ${client.dateInscrit}</p>
            <div class="badges-row">
              <span class="badge badge-purple">${client.typeGamme}</span>
              <span class="badge badge-active">${client.statut === "Completed" ? "Compte Actif" : "Inactif"}</span>
              <span class="badge badge-gender">${client.genre || "Client"}</span>
            </div>
          </div>
        </div>

        <!-- KPI Metrics -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Total Commandes</div>
            <div class="kpi-value">${client.totalCommandes}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Total Dépensé Cumulé</div>
            <div class="kpi-value">${formatPrix(client.totalDepense)} FCFA</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Panier Moyen</div>
            <div class="kpi-value">${formatPrix(client.totalCommandes > 0 ? Math.round(client.totalDepense / client.totalCommandes) : 0)} FCFA</div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="info-grid">
          <div class="card">
            <div class="card-title">Coordonnées & Adresse</div>
            <div class="line"><strong>Nom & Prénom :</strong> ${client.nom}</div>
            <div class="line"><strong>Adresse Email :</strong> ${client.email}</div>
            <div class="line"><strong>Téléphone Mobile :</strong> ${client.telephone}</div>
            <div class="line"><strong>Adresse de Livraison :</strong> ${client.adresse}</div>
            <div class="line"><strong>Ville / Région :</strong> Douala, Cameroun</div>
          </div>

          <div class="card">
            <div class="card-title">Profil Cosmétique & Peau</div>
            <div class="line"><strong>Type de Peau :</strong> Sèche & Sensible</div>
            <div class="line"><strong>Préoccupation :</strong> Hydratation & Éclat</div>
            <div class="line"><strong>Routine Préférée :</strong> Soins Visage Bio ITexal</div>
            <div class="line"><strong>Recommandation :</strong> Sérum Éclat & Crème Karité</div>
            <div class="line"><strong>Canal Préféré :</strong> Email & WhatsApp</div>
          </div>
        </div>

        <!-- Orders Table if available -->
        ${
          client.commandes && client.commandes.length > 0
            ? `
          <div class="table-title">Historique des Commandes (${client.commandes.length})</div>
          <table>
            <thead>
              <tr>
                <th>Réf. Commande</th>
                <th>Date</th>
                <th>Articles Commandés</th>
                <th>Mode Paiement</th>
                <th style="text-align: right;">Total FCFA</th>
                <th style="text-align: center;">Statut</th>
              </tr>
            </thead>
            <tbody>
              ${client.commandes
                .map(
                  (c) => `
                <tr>
                  <td><strong>${c.reference}</strong></td>
                  <td>${c.dateCommande}</td>
                  <td>${c.articlesResume}</td>
                  <td>${c.methodePaiement}</td>
                  <td style="text-align: right; font-weight: bold;">${formatPrix(c.montantTotal)}</td>
                  <td style="text-align: center;">${c.statut}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `
            : ""
        }

        <div class="footer">
          <span>Document confidentiel émis par l'Administration ITexal Cosmetic Admin.</span>
          <span>Page 1 sur 1</span>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 300);
        };
      </script>
    </body>
    </html>
  `;

  fenetre.document.write(html);
  fenetre.document.close();
}

/**
 * Génère un rapport PDF des statistiques d'un produit individuel avec photo et logo
 */
export function exporterStatistiquesProduitPDF(data: ParametresStatistiquesProduitPDF) {
  const fenetre = window.open("", "_blank");
  if (!fenetre) return;

  const dateFormatee = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatPrix = (val: number) =>
    new Intl.NumberFormat("fr-FR").format(val) + " FCFA";

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Statistiques Produit - ${data.produitNom} - ITexal</title>
      <style>
        @page { size: A4 portrait; margin: 15mm; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background: #fff; margin: 0; padding: 20px; font-size: 12px; }
        .box { max-width: 800px; margin: auto; }
        
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #5B63F6; padding-bottom: 15px; margin-bottom: 20px; }
        .brand { display: flex; align-items: center; gap: 16px; }
        .logo-img { height: 54px; width: auto; object-fit: contain; }
        .header-title h1 { margin: 0; font-size: 18px; color: #0f172a; font-weight: 900; }
        .header-title p { margin: 2px 0 0 0; font-size: 11px; color: #64748b; }

        .product-hero { display: flex; align-items: center; gap: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; margin-bottom: 20px; }
        .product-img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; border: 2px solid #5B63F6; }
        .product-details h2 { margin: 0; font-size: 20px; font-weight: 900; color: #0f172a; }
        .product-details p { margin: 4px 0 0 0; font-size: 12px; color: #64748b; }

        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
        .kpi-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; text-align: center; }
        .kpi-label { font-size: 9px; font-weight: 800; text-transform: uppercase; color: #64748b; }
        .kpi-value { font-size: 16px; font-weight: 900; color: #5B63F6; margin-top: 4px; }

        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th { background: #5B63F6; color: white; text-align: left; padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-size: 11px; color: #334155; }
        tr:nth-child(even) { background: #f8fafc; }

        .footer { margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="header">
          <div class="brand">
            <img src="/Admin Cosmetic.png" alt="Logo ITexal Cosmetic" class="logo-img" onError="this.style.display='none';" />
            <div class="header-title">
              <h1>RAPPORT STATISTIQUE PRODUIT</h1>
              <p>ITexal Cosmetic Admin • Analyse d'écoulement et ventes</p>
            </div>
          </div>
          <div style="text-align: right; font-size: 10px; color: #64748b;">
            <strong>ITEXAL COSMETIC ADMIN</strong><br>
            Date : ${dateFormatee}
          </div>
        </div>

        <div class="product-hero">
          ${data.image ? `<img src="${data.image}" alt="${data.produitNom}" class="product-img" />` : ""}
          <div class="product-details">
            <h2>${data.produitNom}</h2>
            <p><strong>Référence :</strong> ${data.reference} • <strong>Catégorie :</strong> ${data.nomCategorie} • <strong>Marque :</strong> ${data.marque}</p>
            <p style="color: #5B63F6; font-weight: 800; margin-top: 6px;">Prix Unitaire : ${formatPrix(data.prixUnitaire)} FCFA</p>
          </div>
        </div>

        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">CA Total Généré</div>
            <div class="kpi-value">${formatPrix(data.chiffreAffairesGenere)} FCFA</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Quantité Vendue</div>
            <div class="kpi-value">${data.quantiteVendue} unités</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Taux Écoulement</div>
            <div class="kpi-value">${data.tauxEcoulement}%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Stock Restant</div>
            <div class="kpi-value" style="color: ${data.stockRestant <= 5 ? '#ef4444' : '#5B63F6'};">${data.stockRestant} en réserve</div>
          </div>
        </div>

        ${
          data.commandesHistorique.length > 0
            ? `
          <h3 style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-top: 20px;">Historique des Ventes (${data.commandesHistorique.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Réf. Commande</th>
                <th>Date</th>
                <th>Client</th>
                <th style="text-align: center;">Quantité</th>
                <th style="text-align: right;">Total FCFA</th>
                <th style="text-align: center;">Statut</th>
              </tr>
            </thead>
            <tbody>
              ${data.commandesHistorique
                .map(
                  (c) => `
                <tr>
                  <td><strong>${c.reference}</strong></td>
                  <td>${c.dateCommande}</td>
                  <td>${c.nomClient}</td>
                  <td style="text-align: center;">${c.quantite}</td>
                  <td style="text-align: right; font-weight: bold;">${formatPrix(c.sousTotal)}</td>
                  <td style="text-align: center;">${c.statut}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `
            : ""
        }

        <div class="footer">
          <span>Document analytique émis par l'Administration ITexal Cosmetic Admin.</span>
          <span>Page 1 sur 1</span>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 300);
        };
      </script>
    </body>
    </html>
  `;

  fenetre.document.write(html);
  fenetre.document.close();
}
