/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Ashyo API')
    .setDescription('API documentation for Ashyo App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(
    appConfig.get<number>('appConfig.port'),
    appConfig.get<string>('appConfig.host'),
    () => {
      console.log(
        `Server running on http://${appConfig.get<string>('appConfig.host')}:${appConfig.get<number>('appConfig.port')}`,
      );
    },
  );
}
bootstrap();
