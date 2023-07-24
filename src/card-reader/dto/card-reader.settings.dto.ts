import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CardReaderSettingsDto {
    @ApiProperty({ example: "http://localhost:3000", required: true })
    @IsString()
    controllerUrl: string;

}
