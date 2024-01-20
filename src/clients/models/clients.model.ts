import * as mongoose from 'mongoose';
import { string } from 'yargs';

export interface Clients extends mongoose.Document, mongoose.SchemaTimestampsConfig {
    clientName: string;
    clientDisplayName: string;
    apiKey: string;
    apiSecret: string;
    enabled: boolean;
}

const ClientSchema = new mongoose.Schema<Clients>({
    clientName: { type: String, required: true, unique: true },
    clientDisplayName: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true, index: true,  minLength: 12, maxLength: 24 },
    apiSecret: { type: String, require: true},
    enabled: { type: Boolean, required: true, default: false }
})

const ClientsModel = mongoose.model<Clients>('webhook-clients', ClientSchema, 'webhook-clients');
export default ClientsModel;