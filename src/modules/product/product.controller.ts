import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';

@ApiTags('Product')
@Controller({ version: '1', path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'List of all products retrieved successfully.' })
  findAllProduct() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Post('/items/add')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create a new product item' })
  @ApiResponse({ status: 201, description: 'The product item has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createProductItem(
    @Body() createProductItemDto: CreateProductItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.createProductItem(createProductItemDto, image);
  }

  @Get('/items')
  @ApiOperation({ summary: 'Retrieve all product items' })
  @ApiResponse({ status: 200, description: 'List of all product items retrieved successfully.' })
  findAllProductItem() {
    return this.productService.findAllItems();
  }

  @Get('/items/:id')
  @ApiOperation({ summary: 'Retrieve a product item by ID' })
  @ApiResponse({ status: 200, description: 'The product item has been retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product item not found.' })
  findOneProductItem(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneItem(id);
  }

  @Patch('/items/update/:id')
  @ApiOperation({ summary: 'Update a product item by ID' })
  @ApiResponse({ status: 200, description: 'The product item has been updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product item not found.' })
  updateProductItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductItemDto: UpdateProductItemDto,
  ) {
    return this.productService.updateItem(id, updateProductItemDto);
  }

  @Delete('/items/:id')
  @ApiOperation({ summary: 'Delete a product item by ID' })
  @ApiResponse({ status: 200, description: 'The product item has been deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product item not found.' })
  removeProductItem(@Param('id', ParseIntPipe) id: number) {
    return this.productService.removeItem(id);
  }
}

