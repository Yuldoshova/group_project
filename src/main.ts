import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ExceptionHandlerFilter from 'exceptionFilter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ExceptionHandlerFilter())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ASHYO SHOP')
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
