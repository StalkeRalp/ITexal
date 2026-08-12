"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProduitsService = void 0;
const common_1 = require("@nestjs/common");
let ProduitsService = class ProduitsService {
    constructor() {
        this.produits = [
            {
                id: 'prod-01',
                nom: 'Sérum Visage Hydratant Karité',
                reference: 'ITX-COSM-001',
                prix: 18500,
                stock: 45,
                nomCategorie: 'Visage',
                nomMarque: 'ITexal Cosméceutiques',
                disponible: true,
                creeLe: '01/08/2026',
            },
            {
                id: 'prod-02',
                nom: 'Lait Corporel Nourrissant Bio',
                reference: 'ITX-COSM-002',
                prix: 12000,
                stock: 8,
                nomCategorie: 'Corps',
                nomMarque: 'Karité Gold Africa',
                disponible: true,
                creeLe: '05/08/2026',
            },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.produits };
    }
    async trouverParId(id) {
        const produit = this.produits.find((p) => p.id === id);
        if (!produit)
            throw new common_1.NotFoundException(`Produit #${id} introuvable`);
        return { succes: true, donnees: produit };
    }
    async creer(donnees) {
        const nouveau = {
            id: `prod-${Date.now()}`,
            ...donnees,
            creeLe: new Date().toLocaleDateString('fr-FR'),
        };
        this.produits.unshift(nouveau);
        return { succes: true, message: 'Produit créé avec succès', donnees: nouveau };
    }
    async modifier(id, modifs) {
        const index = this.produits.findIndex((p) => p.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Produit #${id} introuvable`);
        this.produits[index] = { ...this.produits[index], ...modifs };
        return { succes: true, message: 'Produit mis à jour', donnees: this.produits[index] };
    }
    async supprimer(id) {
        this.produits = this.produits.filter((p) => p.id !== id);
        return { succes: true, message: 'Produit supprimé avec succès' };
    }
};
exports.ProduitsService = ProduitsService;
exports.ProduitsService = ProduitsService = __decorate([
    (0, common_1.Injectable)()
], ProduitsService);
//# sourceMappingURL=produits.service.js.map