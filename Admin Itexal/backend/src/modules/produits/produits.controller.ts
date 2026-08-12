import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Get()
  async lister() {
    return this.produitsService.lister();
  }

  @Get(':id')
  async trouverParId(@Param('id') id: string) {
    return this.produitsService.trouverParId(id);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Gestionnaire de Stock', 'Editeur de Contenu')
  @Post()
  async creer(@Body() donnees: any) {
    return this.produitsService.creer(donnees);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Gestionnaire de Stock', 'Editeur de Contenu')
  @Put(':id')
  async modifier(@Param('id') id: string, @Body() modifs: any) {
    return this.produitsService.modifier(id, modifs);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Delete(':id')
  async supprimer(@Param('id') id: string) {
    return this.produitsService.supprimer(id);
  }
}
