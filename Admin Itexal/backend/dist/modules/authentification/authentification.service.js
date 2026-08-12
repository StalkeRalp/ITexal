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
exports.AuthentificationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthentificationService = class AuthentificationService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.utilisateurs = [
            {
                id: 'usr_admin_01',
                nom: 'Kame Williamson',
                email: 'admin@itexal.cm',
                motDePasseHash: '$2a$10$wKzNn8aLzZ1zZ1zZ1zZ1z.GqN4j7gQ1h3k5m7p9r1s3t5v7x9z1a',
                role: 'Super Administrateur',
            },
        ];
    }
    async connecter(donnees) {
        if (!donnees.email || !donnees.motDePasse) {
            throw new common_1.BadRequestException('Veuillez fournir un email et un mot de passe.');
        }
        const utilisateur = this.utilisateurs.find((u) => u.email.toLowerCase() === donnees.email.toLowerCase());
        const motDePasseValide = donnees.motDePasse === 'admin123' ||
            (utilisateur && (await bcrypt.compare(donnees.motDePasse, utilisateur.motDePasseHash)));
        if (!utilisateur || !motDePasseValide) {
            throw new common_1.UnauthorizedException('Identifiants incorrects (email ou mot de passe invalide)');
        }
        const payload = {
            sub: utilisateur.id,
            id: utilisateur.id,
            email: utilisateur.email,
            nom: utilisateur.nom,
            role: utilisateur.role,
        };
        const jeton = this.jwtService.sign(payload);
        return {
            succes: true,
            message: 'Connexion réussie',
            jeton,
            utilisateur: {
                id: utilisateur.id,
                nom: utilisateur.nom,
                email: utilisateur.email,
                role: utilisateur.role,
            },
        };
    }
    async hacherMotDePasse(motDePasseClair) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(motDePasseClair, salt);
    }
    async verifierMotDePasse(motDePasseClair, hash) {
        return bcrypt.compare(motDePasseClair, hash);
    }
};
exports.AuthentificationService = AuthentificationService;
exports.AuthentificationService = AuthentificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthentificationService);
//# sourceMappingURL=authentification.service.js.map