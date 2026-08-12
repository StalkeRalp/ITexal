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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardeRoles = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorateur_1 = require("../decorateurs/roles.decorateur");
let GardeRoles = class GardeRoles {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const rolesRequis = this.reflector.getAllAndOverride(roles_decorateur_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!rolesRequis || rolesRequis.length === 0) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.role) {
            throw new common_1.ForbiddenException('Accès refusé : Aucun rôle attribué');
        }
        const aAcces = rolesRequis.includes(user.role) || user.role === 'Super Administrateur';
        if (!aAcces) {
            throw new common_1.ForbiddenException(`Accès refusé : Rôle '${user.role}' insuffisant pour cette opération`);
        }
        return true;
    }
};
exports.GardeRoles = GardeRoles;
exports.GardeRoles = GardeRoles = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], GardeRoles);
//# sourceMappingURL=garde-roles.js.map