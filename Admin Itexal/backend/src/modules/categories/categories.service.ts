import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  async lister() {
    return { succes: true, donnees: [] };
  }
}
