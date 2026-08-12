"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
let StocksService = class StocksService {
    constructor() {
        this.stocks = [
            { id: 'prod-01', nom: 'Sérum Visage Hydratant Karité', stock: 45, seuilMin: 10, seuilMax: 100, statut: 'Suffisant' },
            { id: 'prod-02', nom: 'Lait Corporel Nourrissant Bio', stock: 8, seuilMin: 15, seuilMax: 80, statut: 'Alerte Stock Faible' },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.stocks };
    }
    async ajusterStock(id, donnee) {
        const item = this.stocks.find((s) => s.id === id);
        if (!item)
            throw new common_1.NotFoundException(`Produit #${id} non trouvé dans la gestion de stock`);
        item.stock = donnee.stock;
        if (donnee.seuilMin !== undefined)
            item.seuilMin = donnee.seuilMin;
        if (donnee.seuilMax !== undefined)
            item.seuilMax = donnee.seuilMax;
        item.statut = item.stock <= item.seuilMin ? 'Alerte Stock Faible' : 'Suffisant';
        return { succes: true, message: 'Stock ajusté avec succès', donnees: item };
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)()
], StocksService);
//# sourceMappingURL=stocks.service.js.map