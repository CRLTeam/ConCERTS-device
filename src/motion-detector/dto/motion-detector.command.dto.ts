import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class MotionDetectorCommandDto {
    @ApiProperty({ example: 'Motion Detected', required: true })
    @IsString()
    action: string;
}