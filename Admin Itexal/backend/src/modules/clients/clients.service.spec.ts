import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { NotFoundException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('devrait lister les clients', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait trouver un client par id', async () => {
    const res = await service.trouverParId('cli-01');
    expect(res.succes).toBe(true);
    expect(res.donnees.nomComplet).toBe('Nadine Fotso');
  });

  it('devrait lever NotFoundException pour un client inexistant', async () => {
    await expect(service.trouverParId('cli-999')).rejects.toThrow(NotFoundException);
  });

  it('devrait créer un client', async () => {
    const res = await service.creer({ nomComplet: 'Paul Biya', email: 'paul@itexal.cm', ville: 'Yaoundé' });
    expect(res.succes).toBe(true);
    expect(res.donnees.nomComplet).toBe('Paul Biya');
  });

  it('devrait modifier un client existant', async () => {
    const res = await service.modifier('cli-01', { ville: 'Kribi' });
    expect(res.succes).toBe(true);
    expect(res.donnees.ville).toBe('Kribi');
  });

  it('devrait lever NotFoundException lors de la modification d\'un client inexistant', async () => {
    await expect(service.modifier('cli-999', { ville: 'Douala' })).rejects.toThrow(NotFoundException);
  });

  it('devrait supprimer un client', async () => {
    const res = await service.supprimer('cli-01');
    expect(res.succes).toBe(true);
  });
});
