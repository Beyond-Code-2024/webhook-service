import { IsEmail, IsString } from 'class-validator';

export class LoginOrganisationRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
