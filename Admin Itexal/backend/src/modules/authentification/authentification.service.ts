import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthentificationService {
  async connecter(donnees: any) {
    return { succes: true, message: 'Authentification simulée' };
  }
}
