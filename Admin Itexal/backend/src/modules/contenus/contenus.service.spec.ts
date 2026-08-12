import { Test, TestingModule } from '@nestjs/testing';
import { ContenusService } from './contenus.service';

describe('ContenusService', () => {
  let service: ContenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContenusService],
    }).compile();

    service = module.get<ContenusService>(ContenusService);
  });

  it('devrait retourner les contenus dynamiques', async () => {
    const res = await service.obtenir();
    expect(res.succes).toBe(true);
    expect(res.donnees.banniereAccueil).toBeDefined();
  });

  it('devrait modifier les contenus dynamiques', async () => {
    const res = await service.modifier({
      banniereAccueil: { titre: 'Titre de Test Modifié' },
    });
    expect(res.succes).toBe(true);
    expect(res.donnees.banniereAccueil.titre).toBe('Titre de Test Modifié');
  });
});
