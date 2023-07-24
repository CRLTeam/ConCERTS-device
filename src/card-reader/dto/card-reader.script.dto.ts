import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CardReaderScriptDto {
    @ApiProperty({ example: '[{"action": "swipe", "card": 123, "delay": 5}, {"action": "swipe", "card": 321, "delay": 10}]', required: true })
    @IsArray()
    script: any;

    @ApiProperty({ example: '5', required: true })
    @IsNumber()
    repeat: number;
}
