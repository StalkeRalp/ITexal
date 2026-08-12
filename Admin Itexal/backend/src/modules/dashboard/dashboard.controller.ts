import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(GardeAuthentification)
  @Get()
  async obtenirStatistiques() {
    return this.dashboardService.obtenirStatistiques();
  }
}
