import { IsString } from 'class-validator';

export default class RegisterClientRequestDto {
    @IsString()
    clientName: string;

    @IsString()
    clientDisplayName: string;
}