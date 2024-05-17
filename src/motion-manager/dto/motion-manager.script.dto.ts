import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class MotionManagerScriptDto {
    @ApiProperty({ example: '[{"action": "Motion Detected", "delay": 10}, {"action": "Motion Detected", "delay": 20}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '2', required: true })
    @IsNumber()
    repeat: number;
}