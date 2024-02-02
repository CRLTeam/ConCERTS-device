import { Controller, Get, Post, Body  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AirconditionerService } from './airconditioner.service'
import { AirconditionerCommandDto } from './dto/airconditioner.command.dto'
import { AirconditionerSettingsDto } from './dto/airconditioner.settings.dto'
import { AirconditionerScriptDto } from './dto/airconditioner.script.dto'

@ApiTags('Airconditioner')
@Controller('airconditioner')
export class AirconditionerController {
    constructor(private airconditionerService: AirconditionerService) {}

    @Get()
    async status(): Promise<String> {
      return this.airconditionerService.status();
    }

    @Get('log')
    async log(): Promise<any> {
      return this.airconditionerService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.airconditionerService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.airconditionerService.start();
    }

    @Post('settings')
    async settings(@Body() settings: AirconditionerSettingsDto): Promise<boolean> {
        return this.airconditionerService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: AirconditionerCommandDto): Promise<boolean> {
        return this.airconditionerService.command(action);
    }

    @Post('script')
    async script(@Body() script: AirconditionerScriptDto): Promise<boolean> {
        return this.airconditionerService.script(script);
    }    

}
