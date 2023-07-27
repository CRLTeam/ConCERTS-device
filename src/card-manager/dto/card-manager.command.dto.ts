import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CardManagerCommandDto {
    @ApiProperty({ example: 'check', required: true })
    @IsString()
    action: string;

    @ApiProperty({ example: '1234', required: true })
    @IsNumber()
    cardId: number;
}
