import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { CardReaderModule } from './card-reader/card-reader.module';
import { DoorLockModule } from './door-lock/door-lock.module';
import { CardManagerModule } from './card-manager/card-manager.module';

@Module({
  imports: [DeviceModule, CardReaderModule, DoorLockModule, CardManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
