import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MotionDetectorService } from './motion-detector.service';
import { MotionDetectorSettingsDto } from './dto/motion-detector.settings.dto';
import { MotionDetectorCommandDto } from './dto/motion-detector.command.dto';
import { MotionDetectorScriptDto } from './dto/motion-detector.script.dto';

@ApiTags('Motion Detector')
@Controller('motion-detector')
export class MotionDetectorController {
    constructor(private motionDetectorService: MotionDetectorService) {}

    @Get()
    async status(): Promise<String> {
        return this.motionDetectorService.status();
    }

    @Get('log')
    async log() {
        return this.motionDetectorService.log();
    }

    @Get('script')
    async getScript(): Promise<any> {
      return this.motionDetectorService.getScript();
    }

    // creates script from log file
    @Get('logscript')
    async getLogScript(): Promise<any> {
        return this.motionDetectorService.getLogScript();
    }

    @Get('start')
    async start(): Promise<boolean> {
      return this.motionDetectorService.start();
    }

    @Post('settings')
    async settings(@Body() settings: MotionDetectorSettingsDto): Promise<boolean> {
        return this.motionDetectorService.deviceSettings(settings);
    }

    @Post('command')
    async command(@Body() action: MotionDetectorCommandDto): Promise<boolean> {
        return this.motionDetectorService.command(action);
    }

    @Post('script')
    async script(@Body() script: MotionDetectorScriptDto): Promise<boolean> {
        return this.motionDetectorService.script(script);
    }
}