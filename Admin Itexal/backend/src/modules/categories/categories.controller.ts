import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async lister() {
    return this.categoriesService.lister();
  }

  @Get(':id')
  async trouverParId(@Param('id') id: string) {
    return this.categoriesService.trouverParId(id);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Editeur de Contenu')
  @Post()
  async creer(@Body() donnees: any) {
    return this.categoriesService.creer(donnees);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur', 'Editeur de Contenu')
  @Put(':id')
  async modifier(@Param('id') id: string, @Body() modifs: any) {
    return this.categoriesService.modifier(id, modifs);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Delete(':id')
  async supprimer(@Param('id') id: string) {
    return this.categoriesService.supprimer(id);
  }
}
