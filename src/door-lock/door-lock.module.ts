import { Module } from '@nestjs/common';
import { DoorLockController } from './door-lock.controller';
import { DoorLockService } from './door-lock.service';

@Module({
  controllers: [DoorLockController],
  providers: [DoorLockService]
})
export class DoorLockModule {}
