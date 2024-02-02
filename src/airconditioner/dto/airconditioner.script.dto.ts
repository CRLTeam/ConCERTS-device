import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class AirconditionerScriptDto {
    @ApiProperty({ example: '[{"action": "switch", "value": 1, "delay": 5}, {"action": "switch", "value": 0, "delay": 10}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '5', required: true })
    @IsNumber()
    repeat: number;
}
