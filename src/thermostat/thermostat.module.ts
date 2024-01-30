import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ThermostatController } from './thermostat.controller';
import { ThermostatService } from './thermostat.service';

@Module({
  imports: [HttpModule],
  controllers: [ThermostatController],
  providers: [ThermostatService]
})
export class ThermostatModule {}
