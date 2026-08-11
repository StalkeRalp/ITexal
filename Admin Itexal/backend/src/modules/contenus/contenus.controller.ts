import { Controller, Get } from '@nestjs/common';
import { ContenusService } from './contenus.service';

@Controller('contenus')
export class ContenusController {
  constructor(private readonly contenusService: ContenusService) {}

  @Get('bannieres')
  async listerBannieres() {
    return this.contenusService.listerBannieres();
  }
}
