import { Module } from '@nestjs/common';
import { AirconditionerController } from './airconditioner.controller';
import { AirconditionerService } from './airconditioner.service';

@Module({
  controllers: [AirconditionerController],
  providers: [AirconditionerService]
})
export class AirconditionerModule {}
