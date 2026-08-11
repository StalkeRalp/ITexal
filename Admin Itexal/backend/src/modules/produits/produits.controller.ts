import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProduitsService } from './produits.service';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Get()
  async lister() {
    return this.produitsService.lister();
  }

  @Post()
  async creer(@Body() donnees: any) {
    return this.produitsService.creer(donnees);
  }
}
