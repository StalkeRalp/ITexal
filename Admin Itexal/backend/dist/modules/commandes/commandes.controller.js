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
exports.CommandesController = void 0;
const common_1 = require("@nestjs/common");
const commandes_service_1 = require("./commandes.service");
const garde_authentification_1 = require("../../commun/gardes/garde-authentification");
const garde_roles_1 = require("../../commun/gardes/garde-roles");
const roles_decorateur_1 = require("../../commun/decorateurs/roles.decorateur");
let CommandesController = class CommandesController {
    constructor(commandesService) {
        this.commandesService = commandesService;
    }
    async lister() {
        return this.commandesService.lister();
    }
    async trouverParId(id) {
        return this.commandesService.trouverParId(id);
    }
    async modifierStatut(id, statut) {
        return this.commandesService.modifierStatut(id, statut);
    }
};
exports.CommandesController = CommandesController;
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommandesController.prototype, "lister", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommandesController.prototype, "trouverParId", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur', 'Gestionnaire de Stock'),
    (0, common_1.Put)(':id/statut'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('statut')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommandesController.prototype, "modifierStatut", null);
exports.CommandesController = CommandesController = __decorate([
    (0, common_1.Controller)('commandes'),
    __metadata("design:paramtypes", [commandes_service_1.CommandesService])
], CommandesController);
//# sourceMappingURL=commandes.controller.js.map