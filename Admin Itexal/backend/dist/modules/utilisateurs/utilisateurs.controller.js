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
exports.UtilisateursController = void 0;
const common_1 = require("@nestjs/common");
const utilisateurs_service_1 = require("./utilisateurs.service");
const garde_authentification_1 = require("../../commun/gardes/garde-authentification");
const garde_roles_1 = require("../../commun/gardes/garde-roles");
const roles_decorateur_1 = require("../../commun/decorateurs/roles.decorateur");
let UtilisateursController = class UtilisateursController {
    constructor(utilisateursService) {
        this.utilisateursService = utilisateursService;
    }
    async lister() {
        return this.utilisateursService.lister();
    }
    async trouverParId(id) {
        return this.utilisateursService.trouverParId(id);
    }
    async creer(donnees) {
        return this.utilisateursService.creer(donnees);
    }
    async modifier(id, modifs) {
        return this.utilisateursService.modifier(id, modifs);
    }
    async supprimer(id) {
        return this.utilisateursService.supprimer(id);
    }
};
exports.UtilisateursController = UtilisateursController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilisateursController.prototype, "lister", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilisateursController.prototype, "trouverParId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UtilisateursController.prototype, "creer", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UtilisateursController.prototype, "modifier", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilisateursController.prototype, "supprimer", null);
exports.UtilisateursController = UtilisateursController = __decorate([
    (0, common_1.Controller)('utilisateurs'),
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur'),
    __metadata("design:paramtypes", [utilisateurs_service_1.UtilisateursService])
], UtilisateursController);
//# sourceMappingURL=utilisateurs.controller.js.map