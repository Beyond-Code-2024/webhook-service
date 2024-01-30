import { ArrayMinSize, IsArray, IsString, IsIP } from 'class-validator';

export class RegisterServiceRequestDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsIP('4', { each: true })
    whitelistedIps: string[];
}
