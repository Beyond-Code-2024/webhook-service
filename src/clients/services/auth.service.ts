import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterOrganisationRequestDto } from '../dto/requests/register-organisation.dto';
import { RegisterOrganisationResponseDto } from '../dto/responses/register-organisation.dto';
import { LoginOrganisationRequestDto } from '../dto/requests/login-organisation.dto';
import { OrganisationService } from './organisation.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(`Client:${AuthService.name}`);

    constructor(
        private organisationService: OrganisationService,
        private jwtService: JwtService,
    ) {}

    async registerOrganisation(registerOrganisationRequest: RegisterOrganisationRequestDto): Promise<RegisterOrganisationResponseDto> {
        this.logger.log(`REGISTER_ORGANISATION: recieved create organisation request: ${registerOrganisationRequest.name}`);
        const organisation = await this.organisationService.createOrganisation(registerOrganisationRequest);

        this.logger.log(`REGISTER_ORGANISATION: created organisation: name: ${organisation.name} id: ${organisation._id}`);
        return {
            token: await this.jwtService.signAsync({
                organisation: organisation._id,
            }),
        };
    }

    async organisationLogin(loginOrganisationRequest: LoginOrganisationRequestDto) {
        this.logger.log(`ORGANISATION_LOGIN: login request from email: ${loginOrganisationRequest.email}`);
        const organisation = await this.organisationService.findAndVerifyOrganisation(loginOrganisationRequest.email, loginOrganisationRequest.password);
        return {
            token: await this.jwtService.signAsync({
                organisation: organisation._id,
            }),
        };
    }
}
