import { Controller, Get, Post, Body  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThermostatService } from './thermostat.service'

@ApiTags('Thermostat')
@Controller('thermostat')
export class ThermostatController {
    constructor(private thermostatService: ThermostatService) {}

    @Get()
    async status(): Promise<String> {
      return this.thermostatService.status();
    }

}
