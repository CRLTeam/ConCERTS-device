import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CardManagerCommandDto {
    @ApiProperty({ example: 'check'})
    action: string;

    @ApiProperty({ example: '1234'})
    cardId: number;
}
