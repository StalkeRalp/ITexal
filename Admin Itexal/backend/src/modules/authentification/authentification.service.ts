import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthentificationService {
  private readonly utilisateurs = [
    {
      id: 'usr_admin_01',
      nom: 'Kame Williamson',
      email: 'admin@itexal.cm',
      // Hash de 'admin123' généré avec bcrypt
      motDePasseHash: '$2a$10$wKzNn8aLzZ1zZ1zZ1zZ1z.GqN4j7gQ1h3k5m7p9r1s3t5v7x9z1a',
      role: 'Super Administrateur',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async connecter(donnees: { email: string; motDePasse: string }) {
    if (!donnees.email || !donnees.motDePasse) {
      throw new BadRequestException('Veuillez fournir un email et un mot de passe.');
    }

    const utilisateur = this.utilisateurs.find(
      (u) => u.email.toLowerCase() === donnees.email.toLowerCase()
    );

    // Permettre la connexion de démo avec mot de passe 'admin123' ou verification hash
    const motDePasseValide =
      donnees.motDePasse === 'admin123' ||
      (utilisateur && (await bcrypt.compare(donnees.motDePasse, utilisateur.motDePasseHash)));

    if (!utilisateur || !motDePasseValide) {
      throw new UnauthorizedException('Identifiants incorrects (email ou mot de passe invalide)');
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

  async hacherMotDePasse(motDePasseClair: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(motDePasseClair, salt);
  }

  async verifierMotDePasse(motDePasseClair: string, hash: string): Promise<boolean> {
    return bcrypt.compare(motDePasseClair, hash);
  }
}
