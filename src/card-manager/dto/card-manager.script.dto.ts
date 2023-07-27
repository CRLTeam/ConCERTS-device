import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CardManagerScriptDto {
    @ApiProperty({ example: '[{"action": "check", "cardId": 1234, "delay": 10}, {"action": "check", "cardId": 4321, "delay": 20}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '2', required: true })
    @IsNumber()
    repeat: number;
}
