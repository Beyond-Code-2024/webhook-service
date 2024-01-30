import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticateOrganisationGuard } from 'src/clients/guards/auth-organisation.guard';
import { RegisterServiceRequestDto } from '../dto/requests/register-service.dto';
import { ServicesService } from '../services/services.service';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post('register')
    @UseGuards(AuthenticateOrganisationGuard)
    @HttpCode(HttpStatus.CREATED)
    register(@Req() request: any, @Body() registerServiceRequest: RegisterServiceRequestDto) {
        const organisationId = request.res.locals.organisation.id;
        return this.servicesService.register({ organisationId, ...registerServiceRequest });
    }
}
