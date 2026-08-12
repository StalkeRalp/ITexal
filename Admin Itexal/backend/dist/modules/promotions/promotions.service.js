"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsService = void 0;
const common_1 = require("@nestjs/common");
let PromotionsService = class PromotionsService {
    constructor() {
        this.promotions = [
            {
                id: 'promo-01',
                code: 'SUMMER2026',
                reductionPourcentage: 20,
                dateDebut: '01/06/2026',
                dateFin: '31/08/2026',
                statut: 'Active',
                nombreUtilisations: 84,
            },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.promotions };
    }
    async creer(donnees) {
        const nouvelle = {
            id: `promo-${Date.now()}`,
            nombreUtilisations: 0,
            statut: 'Active',
            ...donnees,
        };
        this.promotions.push(nouvelle);
        return { succes: true, message: 'Promotion créée', donnees: nouvelle };
    }
    async modifier(id, modifs) {
        const index = this.promotions.findIndex((p) => p.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Promotion #${id} introuvable`);
        this.promotions[index] = { ...this.promotions[index], ...modifs };
        return { succes: true, message: 'Promotion mise à jour', donnees: this.promotions[index] };
    }
    async supprimer(id) {
        this.promotions = this.promotions.filter((p) => p.id !== id);
        return { succes: true, message: 'Promotion supprimée' };
    }
};
exports.PromotionsService = PromotionsService;
exports.PromotionsService = PromotionsService = __decorate([
    (0, common_1.Injectable)()
], PromotionsService);
//# sourceMappingURL=promotions.service.js.map