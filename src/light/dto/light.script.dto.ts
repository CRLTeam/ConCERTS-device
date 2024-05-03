import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class LightScriptDto {
    @ApiProperty({ example: '[{"action": "on", "delay": 10}, {"action": "off", "delay": 20}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '2', required: true })
    @IsNumber()
    repeat: number;
}