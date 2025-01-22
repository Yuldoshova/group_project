import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brand } from '../brand/entities';
import { Category } from '../categories/entities/category.entities';
import { UploadService } from '../upload';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../categories/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductController],
  providers: [ProductService, UploadService, BrandService, CategoryService],
})
export class ProductModule { }

