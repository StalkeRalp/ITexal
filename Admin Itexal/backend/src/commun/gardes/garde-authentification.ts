import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GardeAuthentification implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      // Pour le dev / tests sans token strict, on injecte un utilisateur admin par défaut
      request.user = {
        id: 'usr_admin_01',
        email: 'admin@itexal.cm',
        nom: 'Kame Williamson',
        role: 'Super Administrateur',
      };
      return true;
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Format de jeton invalide (Bearer attendu)');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Jeton d\'authentification expiré ou invalide');
    }
  }
}
