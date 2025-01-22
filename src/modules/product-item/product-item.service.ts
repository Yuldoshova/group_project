import { Injectable } from '@nestjs/common';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductItem } from './entities/product-item.entity';
import { UploadService } from '../upload';
import { ProductService } from '../product/product.service';
import { ColorService } from '../color';

@Injectable()
export class ProductItemService {

  constructor(
    @InjectRepository(ProductItem)
    private productItemRepository: Repository<ProductItem>,
    private uploadService: UploadService,
    private productService:ProductService,
    private colorService: ColorService,
  ) { }

  async create(create: CreateProductItemDto, image: Express.Multer.File) {

    const uploadImage = await this.uploadService.uploadFile({
      file: image,
      destination: "uploads/product-items"
    })

    const findProduct = await this.productService.findOne(create.productId)
    const findColor = await this.colorService.findOne(create.colorId)

    const newProductItem = this.productItemRepository.create({
      image: uploadImage.imageUrl,
      amount: create.amount,
      price: create.price,
      product: findProduct,
      color: findColor
    });

    await this.productItemRepository.save(newProductItem)

    return newProductItem
  }

  findAll() {
    return `This action returns all productItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productItem`;
  }

  update(id: number, updateProductItemDto: UpdateProductItemDto) {
    return `This action updates a #${id} productItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productItem`;
  }
}
