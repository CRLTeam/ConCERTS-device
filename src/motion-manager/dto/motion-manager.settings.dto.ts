import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MotionManagerSettingsDto {
    @ApiProperty({ example: "http://localhost:3000/light/command", required: true })
    @IsString()
    lightURL: string;   
}