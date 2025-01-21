import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { ProductItem } from './entities/productItem.entity';
import { UploadService } from 'modules/uploads/upload.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductItem)
    private productItemRepository: Repository<ProductItem>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    private uploadService: UploadService
  ) { }


  async createProduct(create: CreateProductDto) {

    const newProduct = this.productRepository.create(create);

    await this.productItemRepository.save(newProduct)


    return {
      message: 'Success✅',
      data: newProduct,
    };
  }

  async createProductItem(create: CreateProductItemDto, image: Express.Multer.File) {

    const uploadImage = await this.uploadService.uploadFile({
      file: image,
      destination: "uploads/products"
    })

    const newProductItem = this.productItemRepository.create({
      image: uploadImage.imageUrl,
      amount: create.amount,
      price: create.price,

    });

    await this.productItemRepository.save(newProductItem)


    return {
      message: 'Success✅',
      data: newProductItem,
    };
  }

  async createColor(name: string, code: string) {
    const newColor = this.colorRepository.create({
      name, code
    })

    await this.colorRepository.save(newColor)

    return newColor
  }

  async findAll() {
    const products = await this.productRepository.find();


    return {
      message: 'Success✅',
      data: products,
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
