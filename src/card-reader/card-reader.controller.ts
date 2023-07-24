import { Controller, Get, Post, Body  } from '@nestjs/common';
import { CardReaderService } from './card-reader.service'
import { CardReaderCommandDto } from './dto/card-reader.command.dto'
import { CardReaderSettingsDto } from './dto/card-reader.settings.dto'
import { CardReaderScriptDto } from './dto/card-reader.script.dto'

@Controller('card-reader')
export class CardReaderController {
    constructor(private cardReaderService: CardReaderService) {}

    @Get()
    async status(): Promise<String> {
      return this.cardReaderService.status();
    }

    @Get('log')
    async log(): Promise<any> {
      return this.cardReaderService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.cardReaderService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.cardReaderService.start();
    }

    @Post('settings')
    async settings(@Body() settings: CardReaderSettingsDto): Promise<boolean> {
        return this.cardReaderService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: CardReaderCommandDto): Promise<boolean> {
        return this.cardReaderService.command(action);
    }

    @Post('script')
    async script(@Body() script: CardReaderScriptDto): Promise<boolean> {
        return this.cardReaderService.script(script);
    }

}
