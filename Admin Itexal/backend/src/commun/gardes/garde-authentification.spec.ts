import { GardeAuthentification } from './garde-authentification';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('GardeAuthentification', () => {
  let garde: GardeAuthentification;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      verify: jest.fn(),
    } as unknown as JwtService;
    garde = new GardeAuthentification(jwtService);
  });

  it('devrait être défini', () => {
    expect(garde).toBeDefined();
  });

  it('devrait valider une requête avec un jeton Bearer valide', () => {
    const mockRequest: any = {
      headers: { authorization: 'Bearer token_test_valide' },
    };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(jwtService, 'verify').mockReturnValue({
      id: 'usr_admin_01',
      email: 'admin@itexal.cm',
      role: 'Super Administrateur',
    });

    const res = garde.canActivate(mockContext);
    expect(res).toBe(true);
    expect(mockRequest.user).toBeDefined();
    expect(mockRequest.user.email).toBe('admin@itexal.cm');
  });

  it('devrait autoriser le mock dev si aucun jeton n\'est fourni', () => {
    const mockRequest: any = { headers: {} };
    const mockContext = {
      switchToHttp: () => ({ getRequest: () => mockRequest }),
    } as unknown as ExecutionContext;

    const res = garde.canActivate(mockContext);
    expect(res).toBe(true);
    expect(mockRequest.user.role).toBe('Super Administrateur');
  });

  it('devrait lever UnauthorizedException en cas de jeton invalide', () => {
    const mockRequest: any = { headers: { authorization: 'Bearer token_invalide' } };
    const mockContext = {
      switchToHttp: () => ({ getRequest: () => mockRequest }),
    } as unknown as ExecutionContext;

    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw new Error('Jeton invalide');
    });

    expect(() => garde.canActivate(mockContext)).toThrow(UnauthorizedException);
  });
});
