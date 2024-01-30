import { ArrayMinSize, IsArray, IsIP, IsString } from 'class-validator';

export class RegisterServiceResponseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsIP('4', { each: true })
    whitelistedIps: string[];

    @IsString()
    apiKey: string;

    @IsString()
    apiSecret: string;
}
