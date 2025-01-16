import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>
  ) { }

  async create(create: CreateProductDto) {

    const newProduct = this.productRepository.create({

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

  async findAll() {
    const users = await this.productRepository.find();
    return {
      message: 'Success✅',
      data: users,
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

    await this.productRepository.update({ id }, { ...update });

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
