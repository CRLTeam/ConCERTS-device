import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CardManagerSettingsDto {
    @ApiProperty({ example: "[1234, 1235, 1236]", required: true })
    @IsArray()
    valid: any;

    @ApiProperty({ example: "http://localhost:3000/door-lock/command", required: true })
    @IsString()
    lockURL: string;   

}
