import { StocksService } from './stocks.service';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            stock: number;
            seuilMin: number;
            seuilMax: number;
            statut: string;
        }[];
    }>;
    ajusterStock(id: string, body: {
        stock: number;
        seuilMin?: number;
        seuilMax?: number;
    }): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            id: string;
            nom: string;
            stock: number;
            seuilMin: number;
            seuilMax: number;
            statut: string;
        };
    }>;
}
