import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Automatic swagger interface generation - OpenAPI
  const config = new DocumentBuilder()
    .setTitle('CONCerts Device')
    .setDescription('The CONCerts Device API description')
    .setVersion('1.0')
    .addTag('CONCerts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Allows for validation of nested DTOs - when a DTO has a JSON parameter
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
