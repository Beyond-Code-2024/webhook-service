import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import loadConfig from 'src/lib/app.config';
import { ClientsModule } from './clients/clients.module';
import { ServicesModule } from './services/services.module';

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
        ServicesModule,
    ],
    controllers: [],
    providers: [AppService, ConfigService],
})
export class AppModule {}
