import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterOrganisationRequestDto } from '../dto/requests/register-organisation.dto';
import { RegisterOrganisationResponseDto } from '../dto/responses/register-organisation.dto';
import { LoginOrganisationRequestDto } from '../dto/requests/login-organisation.dto';
import { OrganisationService } from './organisation.service';

@Injectable()
export class AuthService {
  constructor(
    private organisationService: OrganisationService,
    private jwtService: JwtService,
  ) {}

  async registerOrganisation(
    registerOrganisationRequest: RegisterOrganisationRequestDto,
  ): Promise<RegisterOrganisationResponseDto> {
    const organisation = await this.organisationService.createOrganisation(
      registerOrganisationRequest,
    );
    return {
      token: await this.jwtService.signAsync({
        organisation: organisation._id,
      }),
    };
  }

  async organisationLogin(
    loginOrganisationRequest: LoginOrganisationRequestDto,
  ) {
    const organisation =
      await this.organisationService.findAndVerifyOrganisation(
        loginOrganisationRequest.email,
        loginOrganisationRequest.password,
      );
    return {
      token: await this.jwtService.signAsync({
        organisation: organisation._id,
      }),
    };
  }
}
