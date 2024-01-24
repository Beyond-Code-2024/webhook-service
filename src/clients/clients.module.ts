import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organisation,
  OrganisationSchema,
} from './schemas/organisations.schema';
import { AuthService } from './services/auth.service';
import { OrganisationController } from './controllers/organisations/organisation.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrganisationService } from './services/organisation.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: { expiresIn: '1d' },
          verifyOptions: { algorithms: ['HS256'] },
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: Organisation.name,
        schema: OrganisationSchema,
      },
    ]),
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService, AuthService, ConfigService],
})
export class ClientsModule {}
