import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { Banner } from './entities/banner.entity';
import { Type } from 'class-transformer';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Type])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
