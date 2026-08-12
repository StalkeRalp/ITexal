import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { GardeAuthentification } from '../../commun/gardes/garde-authentification';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'ITEXAL_SECRET_KEY_SUPER_SECURE_2026',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, GardeAuthentification],
  exports: [AuthentificationService, JwtModule, GardeAuthentification],
})
export class AuthentificationModule {}
