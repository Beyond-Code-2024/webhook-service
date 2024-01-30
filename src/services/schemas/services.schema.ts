import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Organisation } from '../../clients/schemas/organisations.schema';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({
    timestamps: true,
    collection: 'webhook-services',
})
export class Service {
    @Prop({ type: Types.ObjectId, require: true, ref: Organisation.name })
    organisationId: Organisation;

    @Prop({ required: true, default: [] })
    whitelistedIps: string[];

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, default: '' })
    description: string;

    @Prop({ required: true, default: [] })
    events: string[];

    @Prop({ required: true, minlength: 10, unique: true, index: true })
    apiKey: string;

    @Prop({ required: true, minLength: 15 })
    apiSecret: string;

    @Prop({ required: true, default: true })
    enabled: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

// Add custom validator
ServiceSchema.path('whitelistedIps').validate((value) => {
    // Check if all elements in the array are valid IP addresses
    return value.every((ip: string) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip));
}, '{VALUE} is not a valid IP address');
