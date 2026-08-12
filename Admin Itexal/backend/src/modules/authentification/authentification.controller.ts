import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { UtilisateurActuel } from '../../commun/decorateurs/utilisateur-actuel.decorateur';

@Controller('auth')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

  @Post('connexion')
  async connecter(@Body() donnees: { email: string; motDePasse: string }) {
    return this.authentificationService.connecter(donnees);
  }

  @Post('login')
  async login(@Body() donnees: { email: string; motDePasse: string }) {
    return this.authentificationService.connecter(donnees);
  }

  @UseGuards(GardeAuthentification)
  @Get('profil')
  async obtenirProfil(@UtilisateurActuel() utilisateur: any) {
    return {
      succes: true,
      donnees: utilisateur,
    };
  }
}
