import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilisateursService {
  async lister() {
    return { succes: true, donnees: [] };
  }
}
