import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { ProductItem } from './entities/product-item.entity';
import { Product } from '../product/entities/product.entity';
import { Color, ColorService } from '../color';
import { Brand } from '../brand/entities';
import { Category } from '../categories/entities/category.entities';
import { UploadService } from '../upload';
import { ProductService } from '../product/product.service';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../categories/category.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProductItem, Product, Color, Brand, Category])],
  controllers: [ProductItemController],
  providers: [ProductItemService, UploadService, ProductService, ColorService, BrandService, CategoryService],
})
export class ProductItemModule {}
