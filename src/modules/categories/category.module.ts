import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entities'
import { UploadService } from '../upload';
import { Variation } from '../variation/entities/variation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Variation])],
  controllers: [CategoryController],
  providers: [CategoryService, UploadService],
})
export class CategoryModule {}
