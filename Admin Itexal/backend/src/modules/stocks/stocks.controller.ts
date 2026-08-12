import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @UseGuards(GardeAuthentification)
  @Get()
  async lister() {
    return this.stocksService.lister();
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Gestionnaire de Stock')
  @Put(':id')
  async ajusterStock(
    @Param('id') id: string,
    @Body() body: { stock: number; seuilMin?: number; seuilMax?: number }
  ) {
    return this.stocksService.ajusterStock(id, body);
  }
}
