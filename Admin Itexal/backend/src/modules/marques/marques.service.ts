import { Injectable } from '@nestjs/common';

@Injectable()
export class MarquesService {
  async lister() {
    return { succes: true, donnees: [] };
  }
}
