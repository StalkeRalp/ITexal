import { Controller, Get } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Get()
  async lister() {
    return this.utilisateursService.lister();
  }
}
