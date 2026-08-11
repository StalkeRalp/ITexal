import { Injectable } from '@nestjs/common';

@Injectable()
export class ContenusService {
  async listerBannieres() {
    return { succes: true, donnees: [] };
  }
}
