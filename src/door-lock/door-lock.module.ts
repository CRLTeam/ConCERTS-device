import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DoorLockController } from './door-lock.controller';
import { DoorLockService } from './door-lock.service';

@Module({
  imports: [HttpModule],
  controllers: [DoorLockController],
  providers: [DoorLockService]
})
export class DoorLockModule {}
