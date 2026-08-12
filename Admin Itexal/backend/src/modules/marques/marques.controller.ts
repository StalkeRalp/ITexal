import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MarquesService } from './marques.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('marques')
export class MarquesController {
  constructor(private readonly marquesService: MarquesService) {}

  @Get()
  async lister() {
    return this.marquesService.lister();
  }

  @Get(':id')
  async trouverParId(@Param('id') id: string) {
    return this.marquesService.trouverParId(id);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Editeur de Contenu')
  @Post()
  async creer(@Body() donnees: any) {
    return this.marquesService.creer(donnees);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Editeur de Contenu')
  @Put(':id')
  async modifier(@Param('id') id: string, @Body() modifs: any) {
    return this.marquesService.modifier(id, modifs);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Delete(':id')
  async supprimer(@Param('id') id: string) {
    return this.marquesService.supprimer(id);
  }
}
