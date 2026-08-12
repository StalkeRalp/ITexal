import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UtilisateursService {
  private utilisateurs = [
    {
      id: 'usr_admin_01',
      nom: 'Kame Williamson',
      email: 'admin@itexal.cm',
      role: 'Super Administrateur',
      statut: 'Actif',
      creeLe: '01/01/2026',
    },
    {
      id: 'usr_stock_02',
      nom: 'Jean Dupont',
      email: 'jean.dupont@itexal.cm',
      role: 'Gestionnaire de Stock',
      statut: 'Actif',
      creeLe: '10/02/2026',
    },
  ];

  async lister() {
    return { succes: true, donnees: this.utilisateurs };
  }

  async trouverParId(id: string) {
    const usr = this.utilisateurs.find((u) => u.id === id);
    if (!usr) throw new NotFoundException(`Utilisateur #${id} introuvable`);
    return { succes: true, donnees: usr };
  }

  async creer(donnees: any) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(donnees.motDePasse || 'Itexal2026!', salt);

    const nouveau = {
      id: `usr_${Date.now()}`,
      nom: donnees.nom,
      email: donnees.email,
      role: donnees.role || 'Gestionnaire de Stock',
      statut: 'Actif',
      motDePasseHash: hash,
      creeLe: new Date().toLocaleDateString('fr-FR'),
    };
    this.utilisateurs.push(nouveau);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { motDePasseHash, ...utilisateurSansPass } = nouveau;
    return { succes: true, message: 'Utilisateur créé', donnees: utilisateurSansPass };
  }

  async modifier(id: string, modifs: any) {
    const index = this.utilisateurs.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`Utilisateur #${id} introuvable`);
    
    if (modifs.motDePasse) {
      const salt = await bcrypt.genSalt(10);
      modifs.motDePasseHash = await bcrypt.hash(modifs.motDePasse, salt);
      delete modifs.motDePasse;
    }

    this.utilisateurs[index] = { ...this.utilisateurs[index], ...modifs };
    return { succes: true, message: 'Utilisateur mis à jour', donnees: this.utilisateurs[index] };
  }

  async supprimer(id: string) {
    this.utilisateurs = this.utilisateurs.filter((u) => u.id !== id);
    return { succes: true, message: 'Utilisateur supprimé' };
  }
}
