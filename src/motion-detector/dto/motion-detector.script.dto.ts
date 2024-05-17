import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class MotionDetectorScriptDto {
    @ApiProperty({ example: '[{"action": "Motion Detected", "delay": 5}, {"action": "Motion Detected", "delay": 10}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '3', required: true })
    @IsNumber()
    repeat: number;
}