import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MotionManagerService } from './motion-manager.service';
import { MotionManagerCommandDto } from './dto/motion-manager.command.dto';
import { MotionManagerSettingsDto } from './dto/motion-manager.settings.dto';
import { MotionManagerScriptDto } from './dto/motion-manager.script.dto';

@ApiTags('Motion Manager')
@Controller('motion-manager')
export class MotionManagerController {
    constructor(private motionManagerService: MotionManagerService) {}

    @Get()
    async status(): Promise<String>{
        return this.motionManagerService.status();
    }

    @Get('log')
    async log() {
        return this.motionManagerService.log();
    }


    @Get('script')
    async getScript(): Promise<any> {
      return this.motionManagerService.getScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.motionManagerService.start();
    }

    // @Get('turn-on-lights')
    // async turnOnLights() {
    //     this.motionManagerService.turnOnLights();
    // }

    @Post('settings')
    async settings(@Body() settings: MotionManagerSettingsDto): Promise<boolean> {
        return this.motionManagerService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() command: MotionManagerCommandDto): Promise<boolean> {
        return this.motionManagerService.command(command);
    }

    @Post('script')
    async script(@Body() script: MotionManagerScriptDto): Promise<boolean> {
        return this.motionManagerService.script(script);
    }
}