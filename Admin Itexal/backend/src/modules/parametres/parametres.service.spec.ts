import { Test, TestingModule } from '@nestjs/testing';
import { ParametresService } from './parametres.service';

describe('ParametresService', () => {
  let service: ParametresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParametresService],
    }).compile();

    service = module.get<ParametresService>(ParametresService);
  });

  it('devrait retourner les paramètres globaux', async () => {
    const res = await service.obtenir();
    expect(res.succes).toBe(true);
    expect(res.donnees.devise).toBe('FCFA');
  });

  it('devrait modifier les paramètres globaux', async () => {
    const res = await service.modifier({ emailSupport: 'contact@itexal.cm' });
    expect(res.succes).toBe(true);
    expect(res.donnees.emailSupport).toBe('contact@itexal.cm');
  });
});
