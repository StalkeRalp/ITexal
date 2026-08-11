import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';

@Module({
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
  exports: [AuthentificationService],
})
export class AuthentificationModule {}
