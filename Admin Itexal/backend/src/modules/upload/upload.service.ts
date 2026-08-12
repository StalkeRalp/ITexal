import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async televerserImage(body: { image: string; type?: string }) {
    if (!body.image) {
      return { succes: false, message: 'Aucune donnée d\'image fournie' };
    }
    // Si l'image est déjà en base64 DataURL ou HTTP, on la retourne comme URL sécurisée
    return {
      succes: true,
      url: body.image,
      message: 'Image téléversée avec succès',
    };
  }
}
