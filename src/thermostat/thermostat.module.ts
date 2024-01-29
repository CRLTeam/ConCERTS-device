import { Module } from '@nestjs/common';
import { ThermostatController } from './thermostat.controller';
import { ThermostatService } from './thermostat.service';

@Module({
  controllers: [ThermostatController],
  providers: [ThermostatService]
})
export class ThermostatModule {}
