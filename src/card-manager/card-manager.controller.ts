import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardManagerService } from './card-manager.service'
import { CardManagerCommandDto } from './dto/card-manager.command.dto'
import { CardManagerSettingsDto } from './dto/card-manager.settings.dto'
import { CardManagerScriptDto } from './dto/card-manager.script.dto'

@ApiTags('Card Manager')
@Controller('card-manager')
export class CardManagerController {
    constructor(private cardManagerService: CardManagerService) {} 

    @Get()
    async status(): Promise<String> {
      return this.cardManagerService.status();
    }

    @Get('log')
    async log(): Promise<any> {
      return this.cardManagerService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.cardManagerService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.cardManagerService.start();
    }

    @Post('settings')
    async settings(@Body() settings: CardManagerSettingsDto): Promise<boolean> {
        return this.cardManagerService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: CardManagerCommandDto): Promise<boolean> {
        return this.cardManagerService.command(action);
    }

    @Post('script')
    async script(@Body() script: CardManagerScriptDto): Promise<boolean> {
        return this.cardManagerService.script(script);
    }

}

