"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarquesService = void 0;
const common_1 = require("@nestjs/common");
let MarquesService = class MarquesService {
    constructor() {
        this.marques = [
            {
                id: 'marq-01',
                nom: 'ITexal Cosméceutiques',
                logo: '',
                paysOrigine: 'Cameroun',
                description: 'Gamme complète de soins dermo-cosmétiques formulée en laboratoire.',
                statut: 'Active',
                nombreProduits: 14,
                creeLe: '01/01/2026',
            },
            {
                id: 'marq-02',
                nom: 'Karité Gold Africa',
                logo: '',
                paysOrigine: 'Côte d\'Ivoire',
                description: 'Marque spécialisée dans les soins naturels à base de beurre de karité bio.',
                statut: 'Active',
                nombreProduits: 8,
                creeLe: '10/02/2026',
            },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.marques };
    }
    async trouverParId(id) {
        const marque = this.marques.find((m) => m.id === id);
        if (!marque)
            throw new common_1.NotFoundException(`Marque #${id} introuvable`);
        return { succes: true, donnees: marque };
    }
    async creer(donnees) {
        const nouvelle = {
            id: `marq-${Date.now()}`,
            nom: donnees.nom,
            description: donnees.description || '',
            logo: donnees.logo || '',
            paysOrigine: donnees.paysOrigine || 'Cameroun',
            statut: donnees.statut || 'Active',
            nombreProduits: 0,
            creeLe: new Date().toLocaleDateString('fr-FR'),
        };
        this.marques.unshift(nouvelle);
        return { succes: true, message: 'Marque créée avec succès', donnees: nouvelle };
    }
    async modifier(id, modifs) {
        const index = this.marques.findIndex((m) => m.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Marque #${id} introuvable`);
        this.marques[index] = { ...this.marques[index], ...modifs };
        return { succes: true, message: 'Marque mise à jour', donnees: this.marques[index] };
    }
    async supprimer(id) {
        this.marques = this.marques.filter((m) => m.id !== id);
        return { succes: true, message: 'Marque supprimée avec succès' };
    }
};
exports.MarquesService = MarquesService;
exports.MarquesService = MarquesService = __decorate([
    (0, common_1.Injectable)()
], MarquesService);
//# sourceMappingURL=marques.service.js.map