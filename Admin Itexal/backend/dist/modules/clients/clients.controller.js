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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("./clients.service");
const garde_authentification_1 = require("../../commun/gardes/garde-authentification");
const garde_roles_1 = require("../../commun/gardes/garde-roles");
const roles_decorateur_1 = require("../../commun/decorateurs/roles.decorateur");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async lister() {
        return this.clientsService.lister();
    }
    async trouverParId(id) {
        return this.clientsService.trouverParId(id);
    }
    async creer(donnees) {
        return this.clientsService.creer(donnees);
    }
    async modifier(id, modifs) {
        return this.clientsService.modifier(id, modifs);
    }
    async supprimer(id) {
        return this.clientsService.supprimer(id);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "lister", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "trouverParId", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "creer", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "modifier", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "supprimer", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map