import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MotionDetectorSettingsDto {
    @ApiProperty({ example: "http://localhost:3000/motion-manager/command", required: true})
    @IsString()
    controllerURL: string;
}