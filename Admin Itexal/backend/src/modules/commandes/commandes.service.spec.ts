import { Test, TestingModule } from '@nestjs/testing';
import { CommandesService } from './commandes.service';
import { NotFoundException } from '@nestjs/common';

describe('CommandesService', () => {
  let service: CommandesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandesService],
    }).compile();

    service = module.get<CommandesService>(CommandesService);
  });

  it('devrait lister les commandes', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait trouver une commande par id', async () => {
    const res = await service.trouverParId('cmd-01');
    expect(res.succes).toBe(true);
    expect(res.donnees.reference).toBe('CMD-2026-0801');
  });

  it('devrait lever NotFoundException si la commande n\'existe pas', async () => {
    await expect(service.trouverParId('cmd-999')).rejects.toThrow(NotFoundException);
  });

  it('devrait modifier le statut d\'une commande', async () => {
    const res = await service.modifierStatut('cmd-01', 'expediee');
    expect(res.succes).toBe(true);
    expect(res.donnees.statut).toBe('expediee');
  });

  it('devrait lever NotFoundException lors de la modification de statut d\'une commande inexistante', async () => {
    await expect(service.modifierStatut('cmd-999', 'livree')).rejects.toThrow(NotFoundException);
  });
});
