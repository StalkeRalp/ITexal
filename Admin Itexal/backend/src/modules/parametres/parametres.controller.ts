import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ParametresService } from './parametres.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('parametres')
export class ParametresController {
  constructor(private readonly parametresService: ParametresService) {}

  @UseGuards(GardeAuthentification)
  @Get()
  async obtenir() {
    return this.parametresService.obtenir();
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Put()
  async modifier(@Body() nouveauxParametres: any) {
    return this.parametresService.modifier(nouveauxParametres);
  }
}
