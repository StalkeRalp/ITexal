import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ContenusService } from './contenus.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('contenus')
export class ContenusController {
  constructor(private readonly contenusService: ContenusService) {}

  @Get()
  async obtenir() {
    return this.contenusService.obtenir();
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Editeur de Contenu')
  @Put()
  async modifier(@Body() nouveauxContenus: any) {
    return this.contenusService.modifier(nouveauxContenus);
  }
}
