import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CardManagerController } from './card-manager.controller';
import { CardManagerService } from './card-manager.service';

@Module({
  imports: [HttpModule],
  controllers: [CardManagerController],
  providers: [CardManagerService]
})
export class CardManagerModule {}
