import { OrganisationService } from './clients/services/organisation.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import loadConfig from 'src/lib/app.config';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [loadConfig] }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get('database.uri'),
                };
            },
        }),
        ClientsModule,
    ],
    controllers: [],
    providers: [AppService, ConfigService],
})
export class AppModule {}
