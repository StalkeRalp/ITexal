import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StocksService {
  private stocks = [
    { id: 'prod-01', nom: 'Sérum Visage Hydratant Karité', stock: 45, seuilMin: 10, seuilMax: 100, statut: 'Suffisant' },
    { id: 'prod-02', nom: 'Lait Corporel Nourrissant Bio', stock: 8, seuilMin: 15, seuilMax: 80, statut: 'Alerte Stock Faible' },
  ];

  async lister() {
    return { succes: true, donnees: this.stocks };
  }

  async ajusterStock(id: string, donnee: { stock: number; seuilMin?: number; seuilMax?: number }) {
    const item = this.stocks.find((s) => s.id === id);
    if (!item) throw new NotFoundException(`Produit #${id} non trouvé dans la gestion de stock`);
    
    item.stock = donnee.stock;
    if (donnee.seuilMin !== undefined) item.seuilMin = donnee.seuilMin;
    if (donnee.seuilMax !== undefined) item.seuilMax = donnee.seuilMax;
    item.statut = item.stock <= item.seuilMin ? 'Alerte Stock Faible' : 'Suffisant';

    return { succes: true, message: 'Stock ajusté avec succès', donnees: item };
  }
}
