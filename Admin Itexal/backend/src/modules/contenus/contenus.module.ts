import { Module } from '@nestjs/common';
import { ContenusController } from './contenus.controller';
import { ContenusService } from './contenus.service';

@Module({
  controllers: [ContenusController],
  providers: [ContenusService],
})
export class ContenusModule {}
