import { Injectable } from '@nestjs/common';

@Injectable()
export class JournalService {
  async lister() {
    return { succes: true, donnees: [] };
  }
}
