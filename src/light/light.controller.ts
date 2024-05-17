import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LightService } from './light.service'
import { LightCommandDto } from './dto/light.command.dto';
import { LightScriptDto } from './dto/light.script.dto';
import { LightSettingsDto } from './dto/light.settings.dto';

@ApiTags('Light')
@Controller('light')
export class LightController {
    constructor(private lightService: LightService) {}

    @Get()
    async status(): Promise<String> {
        return this.lightService.status();
    }

    @Get('log')
    async log() {
        return this.lightService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.lightService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.lightService.start();
    }

    @Post('settings')
    async settings(@Body() settings: LightSettingsDto): Promise<boolean> {
        return this.lightService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: LightCommandDto): Promise<boolean> {
        return this.lightService.command(action);
    }

    @Post('script')
    async script(@Body() script: LightScriptDto): Promise<boolean> {
        return this.lightService.script(script)
    }
}
