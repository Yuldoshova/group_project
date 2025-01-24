import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { Banner } from './entities/banner.entity';
import { BannerType } from './entities/type.status';
import { UploadService } from '../upload';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, BannerType])],
  controllers: [BannerController],
  providers: [BannerService, UploadService],
})
export class BannerModule {}
