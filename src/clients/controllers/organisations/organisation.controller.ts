import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterOrganisationRequestDto } from 'src/clients/dto/requests/register-organisation.dto';
import { LoginOrganisationRequestDto } from 'src/clients/dto/requests/login-organisation.dto';
import { AuthService } from 'src/clients/services/auth.service';

@Controller('organisations')
export class OrganisationController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerOrganisationRequest: RegisterOrganisationRequestDto,
  ) {
    const response = await this.authService.registerOrganisation(
      registerOrganisationRequest,
    );
    return response;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginOrganisationRequest: LoginOrganisationRequestDto) {
    const response = await this.authService.organisationLogin(
      loginOrganisationRequest,
    );
    return response;
  }
}
