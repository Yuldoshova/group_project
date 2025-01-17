import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entities';
import { Variation } from 'modules/variation/entities/variation.entity';
import { UploadService } from 'modules/uploads/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Variation])],
  controllers: [CategoryController],
  providers: [CategoryService, UploadService],
})
export class CategoryModule {}
