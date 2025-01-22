import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UploadService } from '../upload';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../categories/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private uploadService: UploadService,
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) { }


  async getAllProducts(
    page: number = 1,
    limit: number = 10,
    filters?: {
      categoryId?: number;
      brandId?: number;
      minPrice?: number;
      maxPrice?: number;
      search?: string;
      sortBy?: 'price' | 'createdAt' | 'rating';
      sortOrder?: 'ASC' | 'DESC';
    },
  ) {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productItems', 'productItem');

    if (filters?.categoryId) {
      query.andWhere('product.categoryId = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    if (filters?.brandId) {
      query.andWhere('product.brandId = :brandId', {
        brandId: filters.brandId,
      });
    }

    if (filters?.minPrice || filters?.maxPrice) {
      if (filters.minPrice) {
        query.andWhere('productItem.price >= :minPrice', {
          minPrice: filters.minPrice,
        });
      }
      if (filters.maxPrice) {
        query.andWhere('productItem.price <= :maxPrice', {
          maxPrice: filters.maxPrice,
        });
      }
    }

    if (filters?.search) {
      query.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    if (filters?.sortBy) {
      const sortOrder = filters.sortOrder || 'ASC';
      if (filters.sortBy === 'price') {
        query.orderBy('productItem.price', sortOrder);
      } else {
        query.orderBy(`product.${filters.sortBy}`, sortOrder);
      }
    }

    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    // Fetch data
    const [products, total] = await query.getManyAndCount();

    return {
      items: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSingleProduct(id: number) {
    return await this.productRepository.findOne({
      where: { id },
      relations: ["productItems", "reviews"],
    });
  }

  async getMostPopularProducts(limit: number = 10) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productItems', 'productItem')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .orderBy('productItem.price', 'DESC')
      .take(limit)
      .getMany();
    return products;
  }

  async createProduct(create: CreateProductDto, image:Express.Multer.File ) {

    const uploadImage = await this.uploadService.uploadFile({
      file: image,
      destination: "/uploads/products"
    })

    const findBrand = await this.brandService.findOne(create.brandId)
    const findCategory = await this.categoryService.findOne(create.categoryId)

    const newProduct = this.productRepository.create({
      name: create.name,
      description: create.description,
      image: uploadImage.imageUrl,
      brand: findBrand,
      category: findCategory
    });

    await this.productRepository.save(newProduct)

    return newProduct
  }

  async findAll() {
    const products = await this.productRepository.find();

    return products
  }

  async findOne(id: number) {
    const findProduct = await this.productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new NotFoundException('Product not found❗');
    }
    return findProduct
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
}
