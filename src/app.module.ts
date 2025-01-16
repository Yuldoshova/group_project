import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from './config/jwt.config';
import { emailConfig } from './config/email.config';
import { User } from './modules/user/entities/user.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
// import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
// import { RedisCustomModule } from './client/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { ReviewModule } from 'modules/review/review.module'
import { ProductModule } from './modules/product/product.module'
import { VariationModule } from './modules/variation/variation.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 30000,
      limit: 300,
    }]),
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, jwtConfig, emailConfig],
      isGlobal: true,
      envFilePath:'.env'
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
        entites: [User],
        autoLoadEntities:true,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'single',
    //     options: {
    //       host: configService.get('REDIS_HOST'),
    //       port: configService.get('REDIS_PORT'),
    //       password: configService.get('REDIS_PASSWORD'),
    //     },
    //   })
    // }),
    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('emailConfig.host'),
          port: configService.get<number>('emailConfig.port'),
          secure: false,
          auth: {
            user: configService.get<string>('emailConfig.username'),
            pass: configService.get<string>('emailConfig.password'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    // AuthModule,
    UserModule,
    ReviewModule
    ProductModule,
    // RedisCustomModule,
    VariationModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ],
})
export class AppModule {}
