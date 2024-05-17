import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { CardReaderModule } from './card-reader/card-reader.module';
import { DoorLockModule } from './door-lock/door-lock.module';
import { CardManagerModule } from './card-manager/card-manager.module';
import { ThermostatModule } from './thermostat/thermostat.module';
import { FurnaceModule } from './furnace/furnace.module';
import { AirconditionerModule } from './airconditioner/airconditioner.module';
import { MotionDetectorModule } from './motion-detector/motion-detector.module';
import { MotionManagerModule } from './motion-manager/motion-manager.module';
import { LightModule } from './light/light.module';

@Module({
  imports: [DeviceModule, CardReaderModule, DoorLockModule, CardManagerModule, ThermostatModule, FurnaceModule, AirconditionerModule, MotionDetectorModule, MotionManagerModule, LightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
