import { Types } from 'mongoose';

export type RegisterOrganisation = {
    organisationId: Types.ObjectId;
    name: string;
    description?: string;
    whitelistedIps: string[];
};
