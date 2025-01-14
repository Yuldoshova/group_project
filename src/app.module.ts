import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        port: configService.get<number>('dbConfig.port'),
        host: configService.get<string>('dbConfig.host'),
        username: configService.get<string>('dbConfig.user'),
        password: configService.get<string>('dbConfig.password'),
        database: configService.get<string>('dbConfig.dbName'),
        entites: [],
        autoLoadEntities:true,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
})
export class AppModule {}
