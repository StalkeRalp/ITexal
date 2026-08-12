"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandesService = void 0;
const common_1 = require("@nestjs/common");
let CommandesService = class CommandesService {
    constructor() {
        this.commandes = [
            {
                id: 'cmd-01',
                reference: 'CMD-2026-0801',
                clientNom: 'Nadine Fotso',
                clientEmail: 'nadine.fotso@gmail.com',
                montantTotal: 45000,
                statut: 'livree',
                methodePaiement: 'orange_money',
                dateCommande: '10/08/2026',
            },
            {
                id: 'cmd-02',
                reference: 'CMD-2026-0802',
                clientNom: 'Marc Mbarga',
                clientEmail: 'marc.mbarga@yahoo.fr',
                montantTotal: 24000,
                statut: 'en_cours',
                methodePaiement: 'mtn_momo',
                dateCommande: '11/08/2026',
            },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.commandes };
    }
    async trouverParId(id) {
        const cmd = this.commandes.find((c) => c.id === id);
        if (!cmd)
            throw new common_1.NotFoundException(`Commande #${id} introuvable`);
        return { succes: true, donnees: cmd };
    }
    async modifierStatut(id, statut) {
        const index = this.commandes.findIndex((c) => c.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Commande #${id} introuvable`);
        this.commandes[index].statut = statut;
        return { succes: true, message: 'Statut mis à jour', donnees: this.commandes[index] };
    }
};
exports.CommandesService = CommandesService;
exports.CommandesService = CommandesService = __decorate([
    (0, common_1.Injectable)()
], CommandesService);
//# sourceMappingURL=commandes.service.js.map