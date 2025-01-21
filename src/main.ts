import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ExceptionHandlerFilter from 'filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug'] });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1"
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ExceptionHandlerFilter())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ASHYO SHOP')
    .setDescription('The ashyo backend apis')
    .setVersion('1.0')
    .addTag('APIS')
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


