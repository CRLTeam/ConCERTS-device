import { Controller, Get, Post, Body  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThermostatService } from './thermostat.service'
import { ThermostatCommandDto } from './dto/thermostat.command.dto'
import { ThermostatSettingsDto } from './dto/thermostat.settings.dto'
import { ThermostatScriptDto } from './dto/thermostat.script.dto'

@ApiTags('Thermostat')
@Controller('thermostat')
export class ThermostatController {
    constructor(private thermostatService: ThermostatService) {}

    @Get()
    async status(): Promise<String> {
      return this.thermostatService.status();
    }

    @Get('log')
    async log(): Promise<any> {
      return this.thermostatService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.thermostatService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.thermostatService.start();
    }

    @Post('settings')
    async settings(@Body() settings: ThermostatSettingsDto): Promise<boolean> {
        return this.thermostatService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: ThermostatCommandDto): Promise<boolean> {
        return this.thermostatService.command(action);
    }

    @Post('script')
    async script(@Body() script: ThermostatScriptDto): Promise<boolean> {
        return this.thermostatService.script(script);
    }    



}
