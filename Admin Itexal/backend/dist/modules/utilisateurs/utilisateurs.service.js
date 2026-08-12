"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateursService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
let UtilisateursService = class UtilisateursService {
    constructor() {
        this.utilisateurs = [
            {
                id: 'usr_admin_01',
                nom: 'Kame Williamson',
                email: 'admin@itexal.cm',
                role: 'Super Administrateur',
                statut: 'Actif',
                creeLe: '01/01/2026',
            },
            {
                id: 'usr_stock_02',
                nom: 'Jean Dupont',
                email: 'jean.dupont@itexal.cm',
                role: 'Gestionnaire de Stock',
                statut: 'Actif',
                creeLe: '10/02/2026',
            },
        ];
    }
    async lister() {
        return { succes: true, donnees: this.utilisateurs };
    }
    async trouverParId(id) {
        const usr = this.utilisateurs.find((u) => u.id === id);
        if (!usr)
            throw new common_1.NotFoundException(`Utilisateur #${id} introuvable`);
        return { succes: true, donnees: usr };
    }
    async creer(donnees) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(donnees.motDePasse || 'Itexal2026!', salt);
        const nouveau = {
            id: `usr_${Date.now()}`,
            nom: donnees.nom,
            email: donnees.email,
            role: donnees.role || 'Gestionnaire de Stock',
            statut: 'Actif',
            motDePasseHash: hash,
            creeLe: new Date().toLocaleDateString('fr-FR'),
        };
        this.utilisateurs.push(nouveau);
        const { motDePasseHash, ...utilisateurSansPass } = nouveau;
        return { succes: true, message: 'Utilisateur créé', donnees: utilisateurSansPass };
    }
    async modifier(id, modifs) {
        const index = this.utilisateurs.findIndex((u) => u.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Utilisateur #${id} introuvable`);
        if (modifs.motDePasse) {
            const salt = await bcrypt.genSalt(10);
            modifs.motDePasseHash = await bcrypt.hash(modifs.motDePasse, salt);
            delete modifs.motDePasse;
        }
        this.utilisateurs[index] = { ...this.utilisateurs[index], ...modifs };
        return { succes: true, message: 'Utilisateur mis à jour', donnees: this.utilisateurs[index] };
    }
    async supprimer(id) {
        this.utilisateurs = this.utilisateurs.filter((u) => u.id !== id);
        return { succes: true, message: 'Utilisateur supprimé' };
    }
};
exports.UtilisateursService = UtilisateursService;
exports.UtilisateursService = UtilisateursService = __decorate([
    (0, common_1.Injectable)()
], UtilisateursService);
//# sourceMappingURL=utilisateurs.service.js.map