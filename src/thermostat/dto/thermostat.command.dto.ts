import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ThermostatCommandDto {
    @ApiProperty({ example: 'temperature', required: true })
    @IsString()
    action: string;

    @ApiProperty({ example: '21', required: true })
    @IsNumber()
    celcius: number;
}
