import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DoorLockSettingsDto {
    @ApiProperty({ example: "true", required: true })
    @IsString()
    buzz: string;

}
