import { Controller, Get, Post, Body  } from '@nestjs/common';
import { DoorLockService } from './door-lock.service'
import { DoorLockCommandDto } from './dto/door-lock.command.dto'
import { DoorLockSettingsDto } from './dto/door-lock.settings.dto'
import { DoorLockScriptDto } from './dto/door-lock.script.dto'

@Controller('door-lock')
export class DoorLockController {
    constructor(private doorLockService: DoorLockService) {} 

    @Get()
    async status(): Promise<String> {
      return this.doorLockService.status();
    }

    @Get('log')
    async log(): Promise<any> {
      return this.doorLockService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.doorLockService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.doorLockService.start();
    }

    @Post('settings')
    async settings(@Body() settings: DoorLockSettingsDto): Promise<boolean> {
        return this.doorLockService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: DoorLockCommandDto): Promise<boolean> {
        return this.doorLockService.command(action);
    }

    @Post('script')
    async script(@Body() script: DoorLockScriptDto): Promise<boolean> {
        return this.doorLockService.script(script);
    }

}
