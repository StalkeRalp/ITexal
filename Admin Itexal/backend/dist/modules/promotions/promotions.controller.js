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
exports.PromotionsController = void 0;
const common_1 = require("@nestjs/common");
const promotions_service_1 = require("./promotions.service");
const garde_authentification_1 = require("../../commun/gardes/garde-authentification");
const garde_roles_1 = require("../../commun/gardes/garde-roles");
const roles_decorateur_1 = require("../../commun/decorateurs/roles.decorateur");
let PromotionsController = class PromotionsController {
    constructor(promotionsService) {
        this.promotionsService = promotionsService;
    }
    async lister() {
        return this.promotionsService.lister();
    }
    async creer(donnees) {
        return this.promotionsService.creer(donnees);
    }
    async modifier(id, modifs) {
        return this.promotionsService.modifier(id, modifs);
    }
    async supprimer(id) {
        return this.promotionsService.supprimer(id);
    }
};
exports.PromotionsController = PromotionsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "lister", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur', 'Gestionnaire de Stock'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "creer", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur', 'Gestionnaire de Stock'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "modifier", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "supprimer", null);
exports.PromotionsController = PromotionsController = __decorate([
    (0, common_1.Controller)('promotions'),
    __metadata("design:paramtypes", [promotions_service_1.PromotionsService])
], PromotionsController);
//# sourceMappingURL=promotions.controller.js.map