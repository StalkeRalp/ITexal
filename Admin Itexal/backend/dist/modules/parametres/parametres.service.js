"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametresService = void 0;
const common_1 = require("@nestjs/common");
let ParametresService = class ParametresService {
    constructor() {
        this.parametres = {
            nomSite: 'ITexal Admin Portal',
            devise: 'FCFA',
            tva: 19.25,
            emailSupport: 'support@itexal.cm',
            telephoneSupport: '+237 699 00 11 22',
            notificationsEmail: true,
        };
    }
    async obtenir() {
        return { succes: true, donnees: this.parametres };
    }
    async modifier(nouveauxParametres) {
        this.parametres = { ...this.parametres, ...nouveauxParametres };
        return { succes: true, message: 'Paramètres enregistrés avec succès', donnees: this.parametres };
    }
};
exports.ParametresService = ParametresService;
exports.ParametresService = ParametresService = __decorate([
    (0, common_1.Injectable)()
], ParametresService);
//# sourceMappingURL=parametres.service.js.map