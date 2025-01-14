import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService)

  await app.listen(
    appConfig.get<number>('appConfig.port'),
    appConfig.get<string>('appConfig.host'), () => {
      console.log(`Server running port on ${appConfig.get<number>('appConfig.port')}`)
    });
}
bootstrap();
