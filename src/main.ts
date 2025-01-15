import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MOVIE')
    .setDescription('The movie app apis')
    .setVersion('1.0')
    .addTag('apis')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);


  const appConfig = app.get(ConfigService)

  await app.listen(
    appConfig.get<number>('appConfig.port'),
    appConfig.get<string>('appConfig.host'), () => {
      console.log(`Server running port on ${appConfig.get<number>('appConfig.port')}`)
    });
}
bootstrap();
