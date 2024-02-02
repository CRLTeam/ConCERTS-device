import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class FurnaceCommandDto {
    @ApiProperty({ example: 'switch', required: true })
    @IsString()
    action: string;

    @ApiProperty({ example: '1', required: true })
    @IsNumber()
    value: number;
}
