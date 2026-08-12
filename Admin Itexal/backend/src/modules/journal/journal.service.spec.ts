import { Test, TestingModule } from '@nestjs/testing';
import { JournalService } from './journal.service';

describe('JournalService', () => {
  let service: JournalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JournalService],
    }).compile();

    service = module.get<JournalService>(JournalService);
  });

  it('devrait lister les entrées de journal', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait enregistrer un événement dans le journal', async () => {
    const log = {
      utilisateurId: 'usr_admin_01',
      nomUtilisateur: 'Admin Test',
      action: 'SUPPRESSION_MARQUE',
      description: 'Suppression de la marque de test',
    };
    const res = await service.enregistrer(log);
    expect(res.succes).toBe(true);
    expect(res.donnees.action).toBe('SUPPRESSION_MARQUE');
  });
});
