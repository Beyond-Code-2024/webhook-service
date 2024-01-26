import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Organisation as OrganisationType } from '../types';
import { InjectModel } from '@nestjs/mongoose';
import { Organisation } from '../schemas/organisations.schema';
import { Model, Types } from 'mongoose';
import { generateSaltedHash } from '../clients.utils';

@Injectable()
export class OrganisationService {
    private readonly logger = new Logger(OrganisationService.name);
    constructor(
        @InjectModel(Organisation.name)
        private organisationModel: Model<Organisation>,
    ) {}

    async createOrganisation(data: OrganisationType): Promise<Organisation & { _id: Types.ObjectId }> {
        const checkForExistingEntryQuery = {
            $or: [{ name: data.name }, { email: data.email }],
        };
        if (await this.organisationModel.exists(checkForExistingEntryQuery)) {
            throw new BadRequestException('organisation with this name or email already exists');
        }

        let saltedPassword = await generateSaltedHash(data.password);
        let createOrganisation: Organisation & { _id: Types.ObjectId };
        try {
            createOrganisation = await this.organisationModel.create({
                name: data.name,
                email: data.email,
                displayName: data.displayName,
                password: saltedPassword,
            });
        } catch (error) {
            this.logger.error(`DBERROR: not able to create organisation: ${error.message}`, error.stack, {
                name: data.name,
            });
            throw new InternalServerErrorException('not able to create organisation');
        }

        return createOrganisation;
    }

    async findAndVerifyOrganisation(email: string, password: string) {
        const organisation = await this.organisationModel.findOne({ email });
        if (!organisation) {
            throw new BadRequestException('Invalid email');
        }

        const salt = organisation.password.split(':')[0];
        const newPasswordSalt = await generateSaltedHash(password, salt);
        if (newPasswordSalt !== organisation.password) {
            throw new BadRequestException('password does not match');
        }
        return organisation;
    }

    async findOrganisationById(organisationId: string) {
        return this.organisationModel.findById(organisationId);
    }

    async findOrganisationByName(name: string) {
        return this.organisationModel.findOne({ name });
    }
}
