import { IsString } from 'class-validator';

export class OrganisationDetailsResponseDto {
  @IsString()
  name: string;

  @IsString()
  displayName: string;
}
