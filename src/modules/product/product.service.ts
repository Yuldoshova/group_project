import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { Brand } from 'modules/brand/entities/brand.entity';
import { Category } from 'modules/categories/entities/category.entities';
import { error } from 'console';
import { GetProductsFilterDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,

    @InjectRepository(Brand)
    private brendRepository: Repository<Brand>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>

  ) { }

  async createProduct(create: CreateProductDto) {
    console.log('Create object:', create);  // Bu yerda tekshirib ko'ring

    const brand = await this.brendRepository.findOne({ where: { id: create.brandId } });
    if (!brand) {
      throw new Error("Brand not found❌");
    }

    const category = await this.categoryRepository.findOne({ where: { id: create.categoryId } });
    if (!category) {
      throw new Error("Category not found❌");
    }

    if (!create.image) {
      throw new Error("Image is required❌");
    }

    const newProduct = this.productRepository.create({
      name: create.name,
      description: create.description,
      image: create.image,
      brand: brand,
      category: category
    });
    await this.productRepository.save(newProduct);
    
    return {
      message: 'Success✅',
      data: newProduct,
    };
  }


  async createColor(name: string, code: string, productId: number) {
    const colors = await this.colorRepository.find()
  }

  async findAll(page: number = 1, limit: number = 20,order: string = 'createdAt_DESC') {
    const [field,direction] = order.split('_')
    const offset = (page - 1) * limit;
    const [data, count] = await this.productRepository.findAndCount({
      skip: offset,  
      take: limit,   
      order: {[field]: [direction]}
    });
  
    return {
      data,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const findProduct = await this.productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new NotFoundException('Product not found❗');
    }
    return {
      message: 'Success✅',
      data: findProduct,
    };
  }

  async update(id: number, update: UpdateProductDto) {
    const findProduct = await this.productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new NotFoundException('Product not found❗');
    }

    // await this.productRepository.update({ id }, { ...update });

    return {
      message: 'Success✅',
      data: id,
    };
  }

  async remove(id: number) {
    const findProduct = await this.productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new NotFoundException('Product not found❗');
    }
    this.productRepository.delete({ id });
    return {
      message: 'Success✅',
      data: id,
    };
  }
  
// bunisi ishlamadi 😑---
 //                      |
 //                      |  
 //                      |  
  // async getFilteredProducts(filterDto: GetProductsFilterDto) {
  //   const { category, rating, price_min, price_max, page = 1, limit = 10, sortBy } = filterDto;

  //   const query = this.productRepository.createQueryBuilder('product');

  //   // Filtering by category
  //   if (category) {
  //     query.andWhere('product.categoryId = :category', { category });
  //   }

  //   // Filtering by rating
  //   if (rating) {
  //     query.andWhere('product.rating >= :rating', { rating });
  //   }

  //   // Filtering by price range
  //   if (price_min) {
  //     query.andWhere('product.price >= :price_min', { price_min });
  //   }
  //   if (price_max) {
  //     query.andWhere('product.price <= :price_max', { price_max });
  //   }

  //   // Sorting
  //   if (sortBy) {
  //     if (sortBy === 'rating') {
  //       query.orderBy('product.rating', 'DESC');
  //     } else if (sortBy === 'popularity') {
  //       query.orderBy('product.popularity', 'DESC');
  //     } else if (sortBy === 'price') {
  //       query.orderBy('product.price', 'ASC');
  //     }
  //   }

  //   // Pagination
  //   query.skip((page - 1) * limit).take(limit);

  //   const [products, totalProducts] = await query.getManyAndCount();

  //   return {
  //     message: 'Success ✅',
  //     data: products,
  //     total: totalProducts,
  //     page,
  //     limit,
  //     totalPages: Math.ceil(totalProducts / limit),
  //   };
  // }
}
