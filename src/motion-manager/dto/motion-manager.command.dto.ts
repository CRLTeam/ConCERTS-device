import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MotionManagerCommandDto {
    @ApiProperty({ example: 'Motion Detected'})
    @IsString()
    action: string;
}