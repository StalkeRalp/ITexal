import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientsService {
  async lister() {
    return { succes: true, donnees: [] };
  }
}
