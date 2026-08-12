import { GardeRoles } from './garde-roles';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('GardeRoles', () => {
  let garde: GardeRoles;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    garde = new GardeRoles(reflector);
  });

  it('devrait être défini', () => {
    expect(garde).toBeDefined();
  });

  it('devrait autoriser l\'accès si aucun rôle spécifique n\'est requis', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    const mockContext = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'Gestionnaire de Stock' } }),
      }),
    } as unknown as ExecutionContext;

    expect(garde.canActivate(mockContext)).toBe(true);
  });

  it('devrait lever une exception ForbiddenException si l\'utilisateur n\'a pas le rôle requis', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['Super Administrateur']);
    const mockContext = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'Editeur de Contenu' } }),
      }),
    } as unknown as ExecutionContext;

    expect(() => garde.canActivate(mockContext)).toThrow(ForbiddenException);
  });

  it('devrait autoriser le Super Administrateur systématiquement', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['Gestionnaire de Stock']);
    const mockContext = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'Super Administrateur' } }),
      }),
    } as unknown as ExecutionContext;

    expect(garde.canActivate(mockContext)).toBe(true);
  });
});
