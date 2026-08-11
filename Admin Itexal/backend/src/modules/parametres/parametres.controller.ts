import { Controller, Get } from '@nestjs/common';
import { ParametresService } from './parametres.service';

@Controller('parametres')
export class ParametresController {
  constructor(private readonly parametresService: ParametresService) {}

  @Get()
  async obtenirParametres() {
    return this.parametresService.obtenirParametres();
  }
}
