import { Injectable } from '@nestjs/common';

@Injectable()
export class StocksService {
  async obtenirAlertes() {
    return { succes: true, donnees: [] };
  }
}
