import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @UseGuards(GardeAuthentification)
  @Get()
  async lister() {
    return this.commandesService.lister();
  }

  @UseGuards(GardeAuthentification)
  @Get(':id')
  async trouverParId(@Param('id') id: string) {
    return this.commandesService.trouverParId(id);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Gestionnaire de Stock')
  @Put(':id/statut')
  async modifierStatut(@Param('id') id: string, @Body('statut') statut: string) {
    return this.commandesService.modifierStatut(id, statut);
  }
}
