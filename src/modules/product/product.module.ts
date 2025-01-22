import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Color } from './entities/color.entity';
import { ProductItem } from './entities/productItem.entity';
import { Brand } from 'modules/brand/entities/brand.entity';
import { Banner } from 'modules/banner/entities/banner.entity';
import { Category } from 'modules/categories/entities/category.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductItem, Color,Brand,Banner,Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }

