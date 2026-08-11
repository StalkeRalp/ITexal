import { Controller, Post, Body } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

@Controller('auth')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

  @Post('connexion')
  async connecter(@Body() donnees: any) {
    return this.authentificationService.connecter(donnees);
  }
}
