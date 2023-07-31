import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CardManagerCommandDto {
    @ApiProperty({ example: 'check'})
    @IsString()
    action: string;

    @ApiProperty({ example: '1234'})
    @IsNumber()
    cardId: number;
}
