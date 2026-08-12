import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';
import { GardeRoles } from '../../commun/gardes/garde-roles';
import { Roles } from '../../commun/decorateurs/roles.decorateur';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(GardeAuthentification)
  @Get()
  async lister() {
    return this.clientsService.lister();
  }

  @UseGuards(GardeAuthentification)
  @Get(':id')
  async trouverParId(@Param('id') id: string) {
    return this.clientsService.trouverParId(id);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Post()
  async creer(@Body() donnees: any) {
    return this.clientsService.creer(donnees);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Put(':id')
  async modifier(@Param('id') id: string, @Body() modifs: any) {
    return this.clientsService.modifier(id, modifs);
  }

  @UseGuards(GardeAuthentification, GardeRoles)
  @Roles('Super Administrateur')
  @Delete(':id')
  async supprimer(@Param('id') id: string) {
    return this.clientsService.supprimer(id);
  }
}
