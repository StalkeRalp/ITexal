import { Controller, Get } from '@nestjs/common';
import { CommandesService } from './commandes.service';

@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Get()
  async lister() {
    return this.commandesService.lister();
  }
}
