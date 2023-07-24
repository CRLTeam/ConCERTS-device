import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CardReaderCommandDto {
    @ApiProperty({ example: 'swipe', required: true })
    @IsString()
    action: string;

    @ApiProperty({ example: '1234', required: true })
    @IsNumber()
    card: number;
}
