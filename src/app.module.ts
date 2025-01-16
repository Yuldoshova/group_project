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
import { BrandModule } from 'modules/brand/brand.module';
import { PromotionModule } from 'modules/promotion/promotion.module';
import { ReviewModule } from 'modules/review/review.module'
import { ProductModule } from './modules/product/product.module'
import { VariationModule } from './modules/variation/variation.module';
import { Category } from 'modules/categories/entities/category.entities';
import { CategoryModule } from 'modules/categories/category.module';
import { Brand } from 'modules/brand/entities/brand.entity';
import { Product } from 'modules/product/entities/product.entity';
import { Review } from 'modules/review/model/review.model';
import { Color } from 'modules/product/entities/color.entity';
import { ProductItem } from 'modules/product/entities/productItem.entity';
import { Variation } from 'modules/variation/entities/variation.entity';
import { VariationOption } from 'modules/variation/entities/variation-option.entity';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 30000,
      limit: 300,
    }]),
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, jwtConfig, emailConfig],
      isGlobal: true,
      envFilePath: '.env'
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
        entities: [User, Brand, Variation, Category, Product, Color, ProductItem, Review, VariationOption],
        autoLoadEntities: true,
        synchronize: true,
        // logging: true
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
    //   }),
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
    // RedisCustomModule,
    UserModule,
    BrandModule,
    PromotionModule,
    ReviewModule,
    BrandModule,
    ProductModule,
    VariationModule,
    CategoryModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ],
})

export class AppModule { }

