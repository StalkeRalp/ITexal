import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandesService {
  async lister() {
    return { succes: true, donnees: [] };
  }
}
