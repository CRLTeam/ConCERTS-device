import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class DoorLockCommandDto {
    @ApiProperty({ example: 'open', required: true })
    @IsString()
    action: string;

    @ApiProperty({ example: '5', required: true })
    @IsNumber()
    wait: number;
}
