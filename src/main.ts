import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './lib/app.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.NODE_PORT || 8000);
}
bootstrap();
