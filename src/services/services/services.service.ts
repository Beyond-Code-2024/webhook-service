import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Service, ServiceDocument } from '../schemas/services.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterOrganisation } from '../lib/types';
import { generateRandomString } from '../lib/utils';
import { RegisterServiceResponseDto } from '../dto/responses/register-service.dto';

@Injectable()
export class ServicesService {
    private readonly logger = new Logger(ServicesService.name);
    constructor(
        @InjectModel(Service.name)
        private readonly serviceModel: Model<Service>,
    ) {}

    async register(data: RegisterOrganisation) {
        const checkForExistingEntryQuery = {
            organisationId: data.organisationId,
            name: data.name,
        };

        if (await this.serviceModel.exists(checkForExistingEntryQuery)) {
            throw new BadRequestException('service by this name already exists under the organisation');
        }

        const apiKey: string = generateRandomString(10);
        const apiSecret: string = generateRandomString(15);
        let service: ServiceDocument;
        try {
            service = await this.serviceModel.create({
                organisationId: data.organisationId,
                name: data.name,
                description: data.description,
                whitelistedIps: data.whitelistedIps,
                apiKey,
                apiSecret,
            });
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('something went wrong');
        }

        const result = new RegisterServiceResponseDto();
        result.name = service.name;
        result.description = service.description;
        result.apiKey = service.apiKey;
        result.whitelistedIps = service.whitelistedIps;
        result.apiSecret = service.apiSecret;

        return result;
    }
}
