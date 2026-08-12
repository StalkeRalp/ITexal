
-- 1. EXTENSIONS POSTGRESQL & CONFIGURATION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. SUPPRESSION ANCIENNES TABLES (Si Réinitialisation)
DROP TABLE IF EXISTS journal_audit CASCADE;
DROP TABLE IF EXISTS lignes_commandes CASCADE;
DROP TABLE IF EXISTS commandes CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS produits CASCADE;
DROP TABLE IF EXISTS marques CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS utilisateurs CASCADE;
DROP TABLE IF EXISTS contenus CASCADE;
DROP TABLE IF EXISTS parametres CASCADE;

-- 3. TYPES ENUMÉRÉS (ENUMS)
CREATE TYPE role_utilisateur_enum AS ENUM (
    'Super Administrateur',
    'Gestionnaire de Stock',
    'Editeur de Contenu'
);

CREATE TYPE statut_general_enum AS ENUM (
    'Active',
    'Inactive',
    'Actif',
    'Inactif'
);

CREATE TYPE statut_commande_enum AS ENUM (
    'en_attente',
    'en_cours',
    'expediee',
    'livree',
    'annulee'
);

CREATE TYPE severite_journal_enum AS ENUM (
    'Info',
    'Avertissement',
    'Critique'
);

-- ==============================================================================
-- 4. CRÉATION DES TABLES PRINCIPALES
-- ==============================================================================

-- TABLE: UTILISATEURS (Gestion des accès administrateurs)
CREATE TABLE utilisateurs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe_hash VARCHAR(255) NOT NULL,
    role role_utilisateur_enum NOT NULL DEFAULT 'Gestionnaire de Stock',
    statut statut_general_enum NOT NULL DEFAULT 'Actif',
    cree_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: MARQUES (Marques partenaires & dermocosmétiques)
CREATE TABLE marques (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    logo TEXT, -- Stocke l'URL publique Supabase Storage ou DataURL Base64
    pays_origine VARCHAR(60) DEFAULT 'Cameroun',
    statut statut_general_enum DEFAULT 'Active',
    nombre_produits INT DEFAULT 0,
    cree_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: CATEGORIES (Classification des produits)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    ordre_affichage INT DEFAULT 1,
    nombre_produits INT DEFAULT 0,
    cree_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: PRODUITS (Catalogue des articles)
CREATE TABLE produits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(150) NOT NULL,
    slug VARCHAR(170) NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    prix DECIMAL(12,2) NOT NULL CHECK (prix >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    seuil_alerte INT NOT NULL DEFAULT 5 CHECK (seuil_alerte >= 0),
    seuil_alerte_max INT CHECK (seuil_alerte_max >= seuil_alerte),
    disponible BOOLEAN DEFAULT TRUE,
    marque_id UUID REFERENCES marques(id) ON DELETE SET NULL,
    categorie_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    cree_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: CLIENTS (Comptes clients et historiques d'achat)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom_complet VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telephone VARCHAR(30),
    adresse TEXT,
    ville VARCHAR(60) DEFAULT 'Douala',
    total_depense DECIMAL(12,2) DEFAULT 0.00,
    total_commandes INT DEFAULT 0,
    statut statut_general_enum DEFAULT 'Actif',
    date_inscription TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: PROMOTIONS (Codes promo & réductions)
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(40) NOT NULL UNIQUE,
    description TEXT,
    reduction_pourcentage DECIMAL(5,2) NOT NULL CHECK (reduction_pourcentage > 0 AND reduction_pourcentage <= 100),
    date_debut TIMESTAMP WITH TIME ZONE NOT NULL,
    date_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    statut statut_general_enum DEFAULT 'Active',
    nombre_utilisations INT DEFAULT 0,
    cree_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: COMMANDES (Achats et facturation)
CREATE TABLE commandes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(50) NOT NULL UNIQUE,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    promotion_id UUID REFERENCES promotions(id) ON DELETE SET NULL,
    montant_total DECIMAL(12,2) NOT NULL CHECK (montant_total >= 0),
    statut statut_commande_enum DEFAULT 'en_attente',
    methode_paiement VARCHAR(50) DEFAULT 'orange_money',
    adresse_livraison TEXT,
    date_commande TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: LIGNES_COMMANDES (Articles contenus dans une commande)
CREATE TABLE lignes_commandes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commande_id UUID REFERENCES commandes(id) ON DELETE CASCADE,
    produit_id UUID REFERENCES produits(id) ON DELETE SET NULL,
    quantite INT NOT NULL CHECK (quantite > 0),
    prix_unitaire DECIMAL(12,2) NOT NULL,
    total_ligne DECIMAL(12,2) GENERATED ALWAYS AS (quantite * prix_unitaire) STORED
);

-- TABLE: JOURNAL_AUDIT (Audit Logs & Événements de Sécurité)
CREATE TABLE journal_audit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    utilisateur_id UUID REFERENCES utilisateurs(id) ON DELETE SET NULL,
    nom_utilisateur VARCHAR(100),
    role_utilisateur VARCHAR(50),
    type_evenement VARCHAR(60) NOT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    niveau_severite severite_journal_enum DEFAULT 'Info',
    adresse_ip VARCHAR(45),
    horodatage TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: CONTENUS (Bannières et paramètres dynamiques du site)
CREATE TABLE contenus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cle VARCHAR(80) NOT NULL UNIQUE,
    titre TEXT,
    sous_titre TEXT,
    texte_bouton VARCHAR(100),
    image TEXT,
    donnees_json JSONB DEFAULT '{}'::jsonb,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: PARAMETRES (Configuration globale)
CREATE TABLE parametres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cle VARCHAR(80) NOT NULL UNIQUE,
    valeur JSONB NOT NULL,
    description TEXT,
    mis_a_jour_le TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 5. INDEX POUR L'OPTIMISATION DES PERFORMANCES (Speed & Indexing)
-- ==============================================================================
CREATE INDEX idx_produits_marque ON produits(marque_id);
CREATE INDEX idx_produits_categorie ON produits(categorie_id);
CREATE INDEX idx_produits_stock ON produits(stock);
CREATE INDEX idx_commandes_client ON commandes(client_id);
CREATE INDEX idx_commandes_statut ON commandes(statut);
CREATE INDEX idx_journal_horodatage ON journal_audit(horodatage DESC);
CREATE INDEX idx_journal_utilisateur ON journal_audit(utilisateur_id);

-- ==============================================================================
-- 6. TRIGGERS AUTOMATIQUES (Mise à jour automatique de mis_a_jour_le)
-- ==============================================================================
CREATE OR REPLACE FUNCTION declencher_mise_a_jour_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.mis_a_jour_le = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_utilisateurs BEFORE UPDATE ON utilisateurs FOR EACH ROW EXECUTE FUNCTION declencher_mise_a_jour_timestamp();
CREATE TRIGGER trg_update_marques BEFORE UPDATE ON marques FOR EACH ROW EXECUTE FUNCTION declencher_mise_a_jour_timestamp();
CREATE TRIGGER trg_update_categories BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION declencher_mise_a_jour_timestamp();
CREATE TRIGGER trg_update_produits BEFORE UPDATE ON produits FOR EACH ROW EXECUTE FUNCTION declencher_mise_a_jour_timestamp();
CREATE TRIGGER trg_update_clients BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION declencher_mise_a_jour_timestamp();
CREATE TRIGGER trg_update_commandes BEFORE UPDATE ON commandes FOR EACH ROW EXECUTE FUNCTION declencher_mise_a_jour_timestamp();

-- TRIGGER COMPTEUR AUTOMATIQUE : Mise à jour de nombre_produits par marque et catégorie
CREATE OR REPLACE FUNCTION declencher_calcul_nombre_produits()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE marques SET nombre_produits = nombre_produits + 1 WHERE id = NEW.marque_id;
        UPDATE categories SET nombre_produits = nombre_produits + 1 WHERE id = NEW.categorie_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE marques SET nombre_produits = GREATEST(0, nombre_produits - 1) WHERE id = OLD.marque_id;
        UPDATE categories SET nombre_produits = GREATEST(0, nombre_produits - 1) WHERE id = OLD.categorie_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_compteur_produits AFTER INSERT OR DELETE ON produits FOR EACH ROW EXECUTE FUNCTION declencher_calcul_nombre_produits();

-- ==============================================================================
-- 7. RÈGLES DE SÉCURITÉ SUPABASE RLS (ROW LEVEL SECURITY POLICIES)
-- ==============================================================================

-- Activation systématique du RLS sur toutes les tables
ALTER TABLE utilisateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE marques ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE produits ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lignes_commandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE contenus ENABLE ROW LEVEL SECURITY;
ALTER TABLE parametres ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- POLITIQUES RLS : LECTURE PUBLIQUE (Catalogue accessible)
-- ------------------------------------------------------------------------------
CREATE POLICY "Lecture publique des marques" ON marques FOR SELECT USING (true);
CREATE POLICY "Lecture publique des categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Lecture publique des produits" ON produits FOR SELECT USING (disponible = true);
CREATE POLICY "Lecture publique des promotions" ON promotions FOR SELECT USING (statut = 'Active');
CREATE POLICY "Lecture publique des contenus" ON contenus FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- POLITIQUES RLS : RÔLES ADMINISTRATEURS (Utilisateurs authentifiés)
-- ------------------------------------------------------------------------------
-- Seuls les administrateurs connectés ont un accès complet en écriture
CREATE POLICY "Admin modification marques" ON marques FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin modification categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin modification produits" ON produits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin gestion clients" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin gestion commandes" ON commandes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin gestion lignes_commandes" ON lignes_commandes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin gestion promotions" ON promotions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin gestion utilisateurs" ON utilisateurs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin consultation journal" ON journal_audit FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin insertion journal" ON journal_audit FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin gestion contenus" ON contenus FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin gestion parametres" ON parametres FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 8. DONNÉES DE SEMAINE INITIALES (INITIAL SEED DATA)
-- ==============================================================================

-- Super Administrateur par défaut (Mot de passe: admin123 haché bcrypt)
INSERT INTO utilisateurs (nom, email, mot_de_passe_hash, role, statut)
VALUES (
    'Kame Williamson',
    'admin@itexal.cm',
    '$2a$10$wKzNn8aLzZ1zZ1zZ1zZ1z.GqN4j7gQ1h3k5m7p9r1s3t5v7x9z1a',
    'Super Administrateur',
    'Actif'
) ON CONFLICT (email) DO NOTHING;

-- Marques de démo
INSERT INTO marques (id, nom, slug, description, pays_origine, statut)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'ITexal Cosméceutiques', 'itexal-cosmeceutiques', 'Gamme de soins dermo-cosmétiques certifiés.', 'Cameroun', 'Active'),
    ('22222222-2222-2222-2222-222222222222', 'Karité Gold Africa', 'karite-gold-africa', 'Produits naturels enrichis au karité bio.', 'Côte d''Ivoire', 'Active')
ON CONFLICT (nom) DO NOTHING;

-- Catégories de démo
INSERT INTO categories (id, nom, slug, description, ordre_affichage)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Visage', 'visage', 'Sérums, nettoyants et crèmes hydratantes', 1),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Corps', 'corps', 'Laits corporels et huiles végétales', 2)
ON CONFLICT (nom) DO NOTHING;

-- Produits de démo
INSERT INTO produits (reference, nom, slug, description, prix, stock, seuil_alerte, marque_id, categorie_id)
VALUES 
    ('ITX-COSM-001', 'Sérum Visage Hydratant Karité', 'serum-visage-hydratant-karite', 'Sérum concentré à l acide hyaluronique.', 18500.00, 45, 10, '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    ('ITX-COSM-002', 'Lait Corporel Nourrissant Bio', 'lait-corporel-nourrissant-bio', 'Soin corporel hydratation 24h.', 12000.00, 8, 15, '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb')
ON CONFLICT (reference) DO NOTHING;

-- Paramètres globaux
INSERT INTO parametres (cle, valeur, description)
VALUES 
    ('configuration_generale', '{"nomSite": "ITexal Admin Portal", "devise": "FCFA", "tva": 19.25, "emailSupport": "support@itexal.cm"}'::jsonb, 'Paramètres généraux du portail')
ON CONFLICT (cle) DO NOTHING;

-- Log de création de base
INSERT INTO journal_audit (nom_utilisateur, role_utilisateur, type_evenement, action, description, niveau_severite)
VALUES ('Système', 'Super Administrateur', 'BaseDeDonnees', 'INITIALISATION_SCHEMA', 'Schéma Supabase créé avec succès avec règles RLS.', 'Info');
