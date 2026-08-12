import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('utilisateurs')
@UseGuards(GardeAuthentification, GardeRoles)
@Roles('Super Administrateur')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Get()
  async lister() {
    return this.utilisateursService.lister();
  }

  @Get(':id')
  async trouverParId(@Param('id') id: string) {
    return this.utilisateursService.trouverParId(id);
  }

  @Post()
  async creer(@Body() donnees: any) {
    return this.utilisateursService.creer(donnees);
  }

  @Put(':id')
  async modifier(@Param('id') id: string, @Body() modifs: any) {
    return this.utilisateursService.modifier(id, modifs);
  }

  @Delete(':id')
  async supprimer(@Param('id') id: string) {
    return this.utilisateursService.supprimer(id);
  }
}
