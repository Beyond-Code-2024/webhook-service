import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterOrganisationRequestDto {
  @IsString()
  name: string;

  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character, and must be at least eight characters.',
    },
  )
  password: string;
}
