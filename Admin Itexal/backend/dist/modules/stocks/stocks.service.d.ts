export declare class StocksService {
    private stocks;
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
    ajusterStock(id: string, donnee: {
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
