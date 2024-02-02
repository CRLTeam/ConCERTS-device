import { Module } from '@nestjs/common';
import { AirconditionerController } from './airconditioner.controller';
import { AirconditionerService } from './airconditioner.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AirconditionerController],
  providers: [AirconditionerService]
})
export class AirconditionerModule {}
