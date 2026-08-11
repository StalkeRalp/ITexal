export const configurationBaseDeDonnees = {
  hote: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  utilisateur: process.env.DB_USER || 'itexal_admin',
  motDePasse: process.env.DB_PASS || 'secret',
  nomBase: process.env.DB_NAME || 'itexal_db',
  synchroniser: process.env.NODE_ENV !== 'production',
};
