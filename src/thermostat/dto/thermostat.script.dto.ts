import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class ThermostatScriptDto {
    @ApiProperty({ example: '[{"action": "temperature", "celcius": 25, "delay": 5}, {"action": "temperature", "celcius": 26, "delay": 10}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '5', required: true })
    @IsNumber()
    repeat: number;
}
