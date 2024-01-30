import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganisationDocument = HydratedDocument<Organisation>;

@Schema({
    timestamps: true,
    collection: 'webhook-organisations',
})
export class Organisation {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({
        required: true,
        unique: true,
        index: true,
        match: /.+\@.+\..+/,
        message: '{VALUE} is not a valid email',
    })
    email: string;

    @Prop({ required: true, minlength: 10 })
    password: string;

    @Prop({ required: true })
    displayName: string;

    @Prop({ required: true, default: true })
    isActive: boolean;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
