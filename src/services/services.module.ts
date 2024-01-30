import { ServicesService } from './services/services.service';
import { Module } from '@nestjs/common';
import { ClientsModule } from 'src/clients/clients.module';
import { ServicesController } from './controllers/services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schemas/services.schema';

@Module({
    imports: [
        ClientsModule,
        MongooseModule.forFeature([
            {
                name: Service.name,
                schema: ServiceSchema,
            },
        ]),
    ],
    controllers: [ServicesController],
    providers: [ServicesService],
})
export class ServicesModule {}
