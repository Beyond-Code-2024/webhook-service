import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { ControllersController } from './controllers/controllers.controller';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './service/admin/admin.service';
import { AdminService } from './services/admin/admin.service';

@Module({
  controllers: [AdminController, ControllersController],
  providers: [AdminService]
})
export class AdminModule {}
