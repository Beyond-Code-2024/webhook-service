import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RegisterOrganisationRequestDto } from 'src/clients/dto/requests/register-organisation.dto';
import { LoginOrganisationRequestDto } from 'src/clients/dto/requests/login-organisation.dto';
import { AuthService } from 'src/clients/services/auth.service';
import { OrganisationService } from 'src/clients/services/organisation.service';
import { OrganisationDetailsResponseDto } from 'src/clients/dto/responses/organisation-details.dto';
import { AuthenticateOrganisationGuard } from 'src/clients/guards/auth-organisation.guard';

@Controller('organisations')
export class OrganisationController {
    constructor(
        private readonly authService: AuthService,
        private readonly organisationService: OrganisationService,
    ) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerOrganisationRequest: RegisterOrganisationRequestDto) {
        const response = await this.authService.registerOrganisation(registerOrganisationRequest);
        return response;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginOrganisationRequest: LoginOrganisationRequestDto) {
        const response = await this.authService.organisationLogin(loginOrganisationRequest);
        return response;
    }
    @Get(':name')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthenticateOrganisationGuard)
    async getDetails(@Param('name') name: string, @Req() request: any) {
        const response = await this.organisationService.findOrganisationByName(name);
        const organisationId = request.res.locals.organisation?._id;

        if (!response) {
            throw new BadRequestException('organisation does not exist');
        }

        if (response._id.toString() !== organisationId.toString()) {
            throw new UnauthorizedException('you cannot access this organisation');
        }

        const organisationDetailsDto = new OrganisationDetailsResponseDto();
        organisationDetailsDto.name = response.name;
        organisationDetailsDto.displayName = response.displayName;
        return organisationDetailsDto;
    }
}
