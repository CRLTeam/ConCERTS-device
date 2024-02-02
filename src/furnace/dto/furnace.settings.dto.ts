import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FurnaceSettingsDto {
    @ApiProperty({ example: "http://localhost:3000/hvac-controller/command", required: true })
    @IsString()
    controllerUrl: string;

}
