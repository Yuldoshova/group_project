import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisCustomModule } from '@redis';
import { appConfig, dbConfig, emailConfig, jwtConfig } from '@config';
import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { AuthModule, Color, ColorModule, UploadModule, User, UserModule } from '@modules';
import { Category } from './modules/categories/entities/category.entities';
import { Brand } from './modules/brand/entities';
import { Address } from './modules/address/entities/address.entitiy';
import { Banner } from './modules/banner/entities/banner.entity';
import { Card } from './modules/cards/entities/card.entity';
import { Order } from './modules/order/entity/order.entity';
import { OrderItem } from './modules/order-item/entity/order-item.entity';
import { Product } from './modules/product/entities/product.entity';
import { ProductItem } from './modules/product-item/entities/product-item.entity';
import { Variation } from './modules/variation/entities/variation.entity';
import { VariationOption } from './modules/variation/entities/variation-option.entity';
import { Review } from './modules/review/model/review.model';
import { District } from './modules/district/entity/district.entity';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/categories/category.module';
import { AddressModule } from './modules/address/address.module';
import { BannerModule } from './modules/banner/banner.module';
import { CardModule } from './modules/cards/card.module';
import { ProductModule } from './modules/product/product.module';
import { ProductItemModule } from './modules/product-item/product-item.module';
import { VariationModule } from './modules/variation/variation.module';
import { ReviewModule } from './modules/review/review.module';
import { PromotionModule } from './modules/promotion/promotion.module';

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
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
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
        entities: [User, Category, Color, Brand, Address, Banner, Card, Order, OrderItem, Product, ProductItem, Variation, VariationOption, Review, District],
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
    // RedisCustomModule,
    UploadModule,
    // AuthModule,
    UserModule,
    ColorModule,
    BrandModule,
    CategoryModule,
    AddressModule,
    BannerModule,
    CardModule,
    ProductModule,
    ProductItemModule,
    VariationModule,
    ReviewModule,
    PromotionModule

  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD,
    },
    {
      useClass: CheckRoleGuard,
      provide: APP_GUARD,
    },
  ],
})

export class AppModule { }

