"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
let CategoriesService = class CategoriesService {
    constructor() {
        this.categories = [
            { id: 'cat-01', nom: 'Visage', description: 'Soins nettoyants, sérums et crèmes visage', nombreProduits: 12, creeLe: '01/01/2026' },
            { id: 'cat-02', nom: 'Corps', description: 'Laits, huiles et gommages corporels', nombreProduits: 8, creeLe: '01/01/2026' },
            { id: 'cat-03', nom: 'Capillaire', description: 'Shampooings, masques et bains d\'huile', nombreProduits: 6, creeLe: '01/01/2026' },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.categories };
    }
    async trouverParId(id) {
        const categorie = this.categories.find((c) => c.id === id);
        if (!categorie)
            throw new common_1.NotFoundException(`Catégorie #${id} introuvable`);
        return { succes: true, donnees: categorie };
    }
    async creer(donnees) {
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
    async modifier(id, modifs) {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Catégorie #${id} introuvable`);
        this.categories[index] = { ...this.categories[index], ...modifs };
        return { succes: true, message: 'Catégorie mise à jour', donnees: this.categories[index] };
    }
    async supprimer(id) {
        this.categories = this.categories.filter((c) => c.id !== id);
        return { succes: true, message: 'Catégorie supprimée' };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
//# sourceMappingURL=categories.service.js.map