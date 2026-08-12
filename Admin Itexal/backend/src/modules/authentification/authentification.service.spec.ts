import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthentificationService } from './authentification.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthentificationService', () => {
  let service: AuthentificationService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked_jwt_token_itexal'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthentificationService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthentificationService>(AuthentificationService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  it('devrait authentifier un Super Administrateur valide et retourner un JWT token', async () => {
    const res = await service.connecter({ email: 'admin@itexal.cm', motDePasse: 'admin123' });
    expect(res.succes).toBe(true);
    expect(res.jeton).toBe('mocked_jwt_token_itexal');
    expect(res.utilisateur.email).toBe('admin@itexal.cm');
  });

  it('devrait lever une exception UnauthorizedException pour des identifiants invalides', async () => {
    await expect(
      service.connecter({ email: 'inconnu@itexal.cm', motDePasse: 'mauvaispass' })
    ).rejects.toThrow(UnauthorizedException);
  });

  it('devrait hacher et vérifier un mot de passe avec bcrypt', async () => {
    const hash = await service.hacherMotDePasse('MonMotDePasseSecurise2026!');
    expect(hash).not.toBe('MonMotDePasseSecurise2026!');
    const estValide = await service.verifierMotDePasse('MonMotDePasseSecurise2026!', hash);
    expect(estValide).toBe(true);
  });
});
