import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class DoorLockScriptDto {
    @ApiProperty({ example: '[{"action": "open", "wait": 5, "delay": 10}, {"action": "open", "wait": 5, "delay": 20}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '2', required: true })
    @IsNumber()
    repeat: number;
}
