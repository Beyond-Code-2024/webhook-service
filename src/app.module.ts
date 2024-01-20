import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import Config from './app.config'

// 
@Module({
  imports: [
    MongooseModule.forRoot(Config.MONGODB_URI),
    ClientsModule, 
    AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
