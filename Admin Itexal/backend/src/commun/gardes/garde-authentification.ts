import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class GardeAuthentification implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Emplacement pour la vérification du jeton JWT dans l'en-tête Authorization
    return true;
  }
}
