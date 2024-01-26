import { IsJWT } from 'class-validator';

export class RegisterOrganisationResponseDto {
    @IsJWT()
    token: string;
}
