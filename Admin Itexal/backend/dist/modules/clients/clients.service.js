"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
let ClientsService = class ClientsService {
    constructor() {
        this.clients = [
            {
                id: 'cli-01',
                nomComplet: 'Nadine Fotso',
                email: 'nadine.fotso@gmail.com',
                telephone: '+237 699 12 34 56',
                ville: 'Douala',
                dateInscription: '01/06/2026',
                totalCommandes: 5,
                totalDepense: 185000,
                statut: 'actif',
            },
            {
                id: 'cli-02',
                nomComplet: 'Marc Mbarga',
                email: 'marc.mbarga@yahoo.fr',
                telephone: '+237 677 88 99 00',
                ville: 'Yaoundé',
                dateInscription: '15/07/2026',
                totalCommandes: 2,
                totalDepense: 48000,
                statut: 'actif',
            },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.clients };
    }
    async trouverParId(id) {
        const client = this.clients.find((c) => c.id === id);
        if (!client)
            throw new common_1.NotFoundException(`Client #${id} introuvable`);
        return { succes: true, donnees: client };
    }
    async creer(donnees) {
        const nouveau = {
            id: `cli-${Date.now()}`,
            ...donnees,
            dateInscription: new Date().toLocaleDateString('fr-FR'),
            totalCommandes: 0,
            totalDepense: 0,
            statut: 'actif',
        };
        this.clients.unshift(nouveau);
        return { succes: true, message: 'Client ajouté avec succès', donnees: nouveau };
    }
    async modifier(id, modifs) {
        const index = this.clients.findIndex((c) => c.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Client #${id} introuvable`);
        this.clients[index] = { ...this.clients[index], ...modifs };
        return { succes: true, message: 'Client mis à jour', donnees: this.clients[index] };
    }
    async supprimer(id) {
        this.clients = this.clients.filter((c) => c.id !== id);
        return { succes: true, message: 'Client supprimé' };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)()
], ClientsService);
//# sourceMappingURL=clients.service.js.map