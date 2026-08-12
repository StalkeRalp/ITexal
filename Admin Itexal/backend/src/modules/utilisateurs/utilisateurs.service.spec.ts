import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursService } from './utilisateurs.service';
import { NotFoundException } from '@nestjs/common';

describe('UtilisateursService', () => {
  let service: UtilisateursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilisateursService],
    }).compile();

    service = module.get<UtilisateursService>(UtilisateursService);
  });

  it('devrait lister les utilisateurs', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait trouver un utilisateur par id', async () => {
    const res = await service.trouverParId('usr_admin_01');
    expect(res.succes).toBe(true);
    expect(res.donnees.nom).toBe('Kame Williamson');
  });

  it('devrait lever NotFoundException si l\'utilisateur n\'existe pas', async () => {
    await expect(service.trouverParId('usr_inconnu')).rejects.toThrow(NotFoundException);
  });

  it('devrait créer un utilisateur et hacher son mot de passe', async () => {
    const res = await service.creer({
      nom: 'Marie Curie',
      email: 'marie@itexal.cm',
      role: 'Editeur de Contenu',
      motDePasse: 'PassSecurise123!',
    });
    expect(res.succes).toBe(true);
    expect(res.donnees.email).toBe('marie@itexal.cm');
    expect((res.donnees as any).motDePasseHash).toBeUndefined();
  });

  it('devrait modifier un utilisateur et recalculer le hash de mot de passe si fourni', async () => {
    const res = await service.modifier('usr_admin_01', {
      nom: 'Kame Williamson Updated',
      motDePasse: 'NouveauPass2026!',
    });
    expect(res.succes).toBe(true);
    expect(res.donnees.nom).toBe('Kame Williamson Updated');
  });

  it('devrait lever NotFoundException pour une modification d\'utilisateur inexistant', async () => {
    await expect(service.modifier('usr_inconnu', { nom: 'Inconnu' })).rejects.toThrow(NotFoundException);
  });

  it('devrait supprimer un utilisateur', async () => {
    const res = await service.supprimer('usr_stock_02');
    expect(res.succes).toBe(true);
  });
});
