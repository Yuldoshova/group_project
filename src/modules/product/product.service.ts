import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductItem } from './entities/productItem.entity';
import { Color } from './entities/color.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { UploadService } from 'modules/uploads/upload.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductItem)
    private readonly productItemRepository: Repository<ProductItem>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly uploadService: UploadService,
  ) {}

  async createProduct(create: CreateProductDto) {
    const conflictProduct = await this.productRepository.findOneBy({
      name: create.name,
    });

    if (conflictProduct) {
      throw new ConflictException('Product with this name already exists❗');
    }

    const newProduct = this.productRepository.create(create);
    await this.productRepository.save(newProduct);

    return {
      message: 'Success✅',
      data: newProduct,
    };
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
    const conflictProduct = await this.productRepository.findOneBy({
      name: update.name,
    });

    const findProduct = await this.productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new NotFoundException('Product not found❗');
    }
    if (conflictProduct && conflictProduct.id !== id) {
      throw new ConflictException('Product with this name already exists❗');
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

    await this.productRepository.delete({ id });
    return {
      message: 'Success✅',
      data: id,
    };
  }

  async createProductItem(create: CreateProductItemDto, image: Express.Multer.File) {
    const uploadImage = await this.uploadService.uploadFile({
      file: image,
      destination: 'uploads/products',
    });

    const newProductItem = this.productItemRepository.create({
      ...create,
      image: uploadImage.imageUrl,
    });

    await this.productItemRepository.save(newProductItem);

    return {
      message: 'Success✅',
      data: newProductItem,
    };
  }

  async findAllItems() {
    const productItems = await this.productItemRepository.find();
    return {
      message: 'Success✅',
      data: productItems,
    };
  }

  async findOneItem(id: number) {
    const findProductItem = await this.productItemRepository.findOne({ where: { id } });
    if (!findProductItem) {
      throw new NotFoundException('Product item not found❗');
    }
    return {
      message: 'Success✅',
      data: findProductItem,
    };
  }

  async updateItem(id: number, update: UpdateProductItemDto) {
    const findProductItem = await this.productItemRepository.findOne({ where: { id } });
    if (!findProductItem) {
      throw new NotFoundException('Product item not found❗');
    }

    await this.productItemRepository.update({ id }, { ...update });
    return {
      message: 'Success✅',
      data: id,
    };
  }

  async removeItem(id: number) {
    const findProductItem = await this.productItemRepository.findOne({ where: { id } });
    if (!findProductItem) {
      throw new NotFoundException('Product item not found❗');
    }

    await this.productItemRepository.delete({ id });
    return {
      message: 'Success✅',
      data: id,
    };
  }

  async createColor(name: string, code: string) {
    const conflictColor = await this.colorRepository.findOneBy({ name });
    if (conflictColor) {
      throw new ConflictException('Color with this name already exists❗');
    }

    const newColor = this.colorRepository.create({ name, code });
    await this.colorRepository.save(newColor);

    return {
      message: 'Success✅',
      data: newColor,
    };
  }
}

