import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('devrait retourner l\'URL de l\'image si fournie', async () => {
    const res = await service.televerserImage({
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    });
    expect(res.succes).toBe(true);
    expect(res.url).toBeDefined();
  });

  it('devrait retourner un échec si aucune image n\'est fournie', async () => {
    const res = await service.televerserImage({ image: '' });
    expect(res.succes).toBe(false);
  });
});
