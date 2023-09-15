import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.APP_PORT || 8000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({}));

    app.setGlobalPrefix('api');

    await app.listen(PORT, () => {
        console.log(`===> Server started on port ${PORT} <===`);
    });
}
bootstrap();
