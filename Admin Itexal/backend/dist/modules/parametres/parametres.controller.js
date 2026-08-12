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
exports.ParametresController = void 0;
const common_1 = require("@nestjs/common");
const parametres_service_1 = require("./parametres.service");
const garde_authentification_1 = require("../../commun/gardes/garde-authentification");
const garde_roles_1 = require("../../commun/gardes/garde-roles");
const roles_decorateur_1 = require("../../commun/decorateurs/roles.decorateur");
let ParametresController = class ParametresController {
    constructor(parametresService) {
        this.parametresService = parametresService;
    }
    async obtenir() {
        return this.parametresService.obtenir();
    }
    async modifier(nouveauxParametres) {
        return this.parametresService.modifier(nouveauxParametres);
    }
};
exports.ParametresController = ParametresController;
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParametresController.prototype, "obtenir", null);
__decorate([
    (0, common_1.UseGuards)(garde_authentification_1.GardeAuthentification, garde_roles_1.GardeRoles),
    (0, roles_decorateur_1.Roles)('Super Administrateur'),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParametresController.prototype, "modifier", null);
exports.ParametresController = ParametresController = __decorate([
    (0, common_1.Controller)('parametres'),
    __metadata("design:paramtypes", [parametres_service_1.ParametresService])
], ParametresController);
//# sourceMappingURL=parametres.controller.js.map