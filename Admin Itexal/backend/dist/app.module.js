"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const authentification_module_1 = require("./modules/authentification/authentification.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const produits_module_1 = require("./modules/produits/produits.module");
const categories_module_1 = require("./modules/categories/categories.module");
const marques_module_1 = require("./modules/marques/marques.module");
const commandes_module_1 = require("./modules/commandes/commandes.module");
const clients_module_1 = require("./modules/clients/clients.module");
const stocks_module_1 = require("./modules/stocks/stocks.module");
const promotions_module_1 = require("./modules/promotions/promotions.module");
const contenus_module_1 = require("./modules/contenus/contenus.module");
const utilisateurs_module_1 = require("./modules/utilisateurs/utilisateurs.module");
const journal_module_1 = require("./modules/journal/journal.module");
const parametres_module_1 = require("./modules/parametres/parametres.module");
const upload_module_1 = require("./modules/upload/upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            authentification_module_1.AuthentificationModule,
            dashboard_module_1.DashboardModule,
            produits_module_1.ProduitsModule,
            categories_module_1.CategoriesModule,
            marques_module_1.MarquesModule,
            commandes_module_1.CommandesModule,
            clients_module_1.ClientsModule,
            stocks_module_1.StocksModule,
            promotions_module_1.PromotionsModule,
            contenus_module_1.ContenusModule,
            utilisateurs_module_1.UtilisateursModule,
            journal_module_1.JournalModule,
            parametres_module_1.ParametresModule,
            upload_module_1.UploadModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map