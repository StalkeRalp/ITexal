import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private categories = [
    { id: 'cat-01', nom: 'Visage', description: 'Soins nettoyants, sérums et crèmes visage', nombreProduits: 12, creeLe: '01/01/2026' },
    { id: 'cat-02', nom: 'Corps', description: 'Laits, huiles et gommages corporels', nombreProduits: 8, creeLe: '01/01/2026' },
    { id: 'cat-03', nom: 'Capillaire', description: 'Shampooings, masques et bains d\'huile', nombreProduits: 6, creeLe: '01/01/2026' },
  ];

  async lister() {
    return { succes: true, donnees: this.categories };
  }

  async trouverParId(id: string) {
    const categorie = this.categories.find((c) => c.id === id);
    if (!categorie) throw new NotFoundException(`Catégorie #${id} introuvable`);
    return { succes: true, donnees: categorie };
  }

  async creer(donnees: any) {
    const nouvelle = {
      id: `cat-${Date.now()}`,
      nom: donnees.nom,
      description: donnees.description || '',
      nombreProduits: 0,
      creeLe: new Date().toLocaleDateString('fr-FR'),
    };
    this.categories.push(nouvelle);
    return { succes: true, message: 'Catégorie créée', donnees: nouvelle };
  }

  async modifier(id: string, modifs: any) {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Catégorie #${id} introuvable`);
    this.categories[index] = { ...this.categories[index], ...modifs };
    return { succes: true, message: 'Catégorie mise à jour', donnees: this.categories[index] };
  }

  async supprimer(id: string) {
    this.categories = this.categories.filter((c) => c.id !== id);
    return { succes: true, message: 'Catégorie supprimée' };
  }
}
