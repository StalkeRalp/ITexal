import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorateurs/roles.decorateur';

@Injectable()
export class GardeRoles implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequis = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rolesRequis || rolesRequis.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      throw new ForbiddenException('Accès refusé : Aucun rôle attribué');
    }

    const aAcces = rolesRequis.includes(user.role) || user.role === 'Super Administrateur';
    if (!aAcces) {
      throw new ForbiddenException(`Accès refusé : Rôle '${user.role}' insuffisant pour cette opération`);
    }

    return true;
  }
}
