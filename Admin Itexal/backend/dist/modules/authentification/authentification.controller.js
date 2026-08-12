"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationController = void 0;
const common_1 = require("@nestjs/common");
const authentification_service_1 = require("./authentification.service");
const garde_authentification_1 = require("../../commun/gardes/garde-authentification");
const utilisateur_actuel_decorateur_1 = require("../../commun/decorateurs/utilisateur-actuel.decorateur");
let AuthentificationController = class AuthentificationController {
    constructor(authentificationService) {
        this.authentificationService = authentificationService;
    }
    async connecter(donnees) {
        return this.authentificationService.connecter(donnees);
    }
    async login(donnees) {
        return this.authentificationService.connecter(donnees);
    }
    async obtenirProfil(utilisateur) {
        return {
            succes: true,
            donnees: utilisateur,
        };
    }
};
exports.AuthentificationController = AuthentificationController;
__decorate([
    (0, common_1.Post)('connexion'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthentificationController.prototype, "connecter", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthentificationController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification),
    (0, common_1.Get)('profil'),
    __param(0, (0, utilisateur_actuel_decorateur_1.UtilisateurActuel)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthentificationController.prototype, "obtenirProfil", null);
exports.AuthentificationController = AuthentificationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [authentification_service_1.AuthentificationService])
], AuthentificationController);
//# sourceMappingURL=authentification.controller.js.map