"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalService = void 0;
const common_1 = require("@nestjs/common");
let JournalService = class JournalService {
    constructor() {
        this.logs = [
            {
                id: 'log-01',
                horodatage: new Date().toISOString(),
                utilisateurId: 'usr_admin_01',
                nomUtilisateur: 'Kame Williamson',
                roleUtilisateur: 'Super Administrateur',
                typeEvenement: 'Authentification',
                action: 'CONNEXION_REUSSIE',
                description: 'Connexion de l\'administrateur depuis le tableau de bord.',
                niveauSeverite: 'Info',
                adresseIP: '197.234.221.14',
            },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.logs };
    }
    async enregistrer(log) {
        const entree = {
            id: `log-${Date.now()}`,
            horodatage: new Date().toISOString(),
            niveauSeverite: 'Info',
            ...log,
        };
        this.logs.unshift(entree);
        return { succes: true, message: 'Événement consigné dans le journal', donnees: entree };
    }
};
exports.JournalService = JournalService;
exports.JournalService = JournalService = __decorate([
    (0, common_1.Injectable)()
], JournalService);
//# sourceMappingURL=journal.service.js.map