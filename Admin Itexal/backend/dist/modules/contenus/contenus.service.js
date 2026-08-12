"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContenusService = void 0;
const common_1 = require("@nestjs/common");
let ContenusService = class ContenusService {
    constructor() {
        this.contenus = {
            banniereAccueil: {
                titre: 'Soins Dermo-Cosmétiques Innovants',
                sousTitre: 'Formules certifiées par des experts dermatologues.',
                texteBouton: 'Découvrir nos gammes',
                image: '',
            },
            actualites: [
                { id: 'actu-01', titre: 'Lancement de la nouvelle gamme Karité Gold', date: '01/08/2026' },
            ],
        };
    }
    async obtenir() {
        return { succes: true, donnees: this.contenus };
    }
    async modifier(nouveauxContenus) {
        this.contenus = { ...this.contenus, ...nouveauxContenus };
        return { succes: true, message: 'Contenus mis à jour', donnees: this.contenus };
    }
};
exports.ContenusService = ContenusService;
exports.ContenusService = ContenusService = __decorate([
    (0, common_1.Injectable)()
], ContenusService);
//# sourceMappingURL=contenus.service.js.map