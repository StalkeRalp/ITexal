import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  async lister() {
    return this.promotionsService.lister();
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Gestionnaire de Stock')
  @Post()
  async creer(@Body() donnees: any) {
    return this.promotionsService.creer(donnees);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Gestionnaire de Stock')
  @Put(':id')
  async modifier(@Param('id') id: string, @Body() modifs: any) {
    return this.promotionsService.modifier(id, modifs);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Delete(':id')
  async supprimer(@Param('id') id: string) {
    return this.promotionsService.supprimer(id);
  }
}
