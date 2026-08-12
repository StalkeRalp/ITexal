import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
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
