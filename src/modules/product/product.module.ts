import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Color } from './entities/color.entity';
import { ProductItem } from './entities/productItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductItem, Color])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }

