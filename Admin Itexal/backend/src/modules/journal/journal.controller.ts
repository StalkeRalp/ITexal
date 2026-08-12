import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JournalService } from './journal.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @UseGuards(GardeAuthentification)
  @Get()
  async lister() {
    return this.journalService.lister();
  }

  @UseGuards(GardeAuthentification)
  @Post()
  async enregistrer(@Body() log: any) {
    return this.journalService.enregistrer(log);
  }
}
