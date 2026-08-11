import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class GardeRoles implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Emplacement pour le contrôle d'accès basé sur les rôles (RBAC)
    return true;
  }
}
