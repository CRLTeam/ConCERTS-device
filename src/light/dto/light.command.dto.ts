import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LightCommandDto {
    @ApiProperty({ example: 'on', required: true })
    @IsString()
    action: string;
}