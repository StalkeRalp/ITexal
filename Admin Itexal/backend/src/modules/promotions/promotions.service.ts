import { Injectable } from '@nestjs/common';

@Injectable()
export class PromotionsService {
  async lister() {
    return { succes: true, donnees: [] };
  }
}
