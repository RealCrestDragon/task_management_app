import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Task Management')
    .setDescription('Task Management API description')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in DTO
      forbidNonWhitelisted: true, // throw error instead of just stripping
      transform: true, // auto-transform payloads to DTO class instances
    }),
  );
  await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
