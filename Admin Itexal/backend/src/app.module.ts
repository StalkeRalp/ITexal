import { Module } from '@nestjs/common';
import { AuthentificationModule } from './modules/authentification/authentification.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ProduitsModule } from './modules/produits/produits.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MarquesModule } from './modules/marques/marques.module';
import { CommandesModule } from './modules/commandes/commandes.module';
import { ClientsModule } from './modules/clients/clients.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { ContenusModule } from './modules/contenus/contenus.module';
import { UtilisateursModule } from './modules/utilisateurs/utilisateurs.module';
import { JournalModule } from './modules/journal/journal.module';
import { ParametresModule } from './modules/parametres/parametres.module';

@Module({
  imports: [
    AuthentificationModule,
    DashboardModule,
    ProduitsModule,
    CategoriesModule,
    MarquesModule,
    CommandesModule,
    ClientsModule,
    StocksModule,
    PromotionsModule,
    ContenusModule,
    UtilisateursModule,
    JournalModule,
    ParametresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
