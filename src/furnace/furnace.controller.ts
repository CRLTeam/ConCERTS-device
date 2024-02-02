import { Controller, Get, Post, Body  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FurnaceService } from './furnace.service'
import { FurnaceCommandDto } from './dto/furnace.command.dto'
import { FurnaceSettingsDto } from './dto/furnace.settings.dto'
import { FurnaceScriptDto } from './dto/furnace.script.dto'

@ApiTags('Furnace')
@Controller('furnace')
export class FurnaceController {
    constructor(private furnaceService: FurnaceService) {}

    @Get()
    async status(): Promise<String> {
      return this.furnaceService.status();
    }

    @Get('log')
    async log(): Promise<any> {
      return this.furnaceService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.furnaceService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.furnaceService.start();
    }

    @Post('settings')
    async settings(@Body() settings: FurnaceSettingsDto): Promise<boolean> {
        return this.furnaceService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: FurnaceCommandDto): Promise<boolean> {
        return this.furnaceService.command(action);
    }

    @Post('script')
    async script(@Body() script: FurnaceScriptDto): Promise<boolean> {
        return this.furnaceService.script(script);
    }    

}
