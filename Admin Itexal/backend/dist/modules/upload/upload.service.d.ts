export declare class UploadService {
    televerserImage(body: {
        image: string;
        type?: string;
    }): Promise<{
        succes: boolean;
        message: string;
        url?: undefined;
    } | {
        succes: boolean;
        url: string;
        message: string;
    }>;
}
