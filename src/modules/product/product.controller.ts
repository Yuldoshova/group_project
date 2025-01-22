import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller({ version: "1", path:"products" })
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post("/add")
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.productService.createProduct(createProductDto, image);
  }

  @Get('/single/:id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch('/update/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/delete:id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get filtered, paginated, and sorted products' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page (default: 10)', example: 10 })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category ID', example: 3 })
  @ApiQuery({ name: 'brandId', required: false, description: 'Filter by brand ID', example: 2 })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price for filtering', example: 100 })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price for filtering', example: 1000 })
  @ApiQuery({ name: 'search', required: false, description: 'Search by product name or description', example: 'phone' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort by field (price, name, createdAt)', example: 'price' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Sort order (ASC or DESC)', example: 'ASC' })
  async getProducts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('categoryId') categoryId?: number,
    @Query('brandId') brandId?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: 'price' | 'createdAt' | 'rating',
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    return this.productService.getAllProducts(page, limit, {
      categoryId,
      brandId,
      minPrice,
      maxPrice,
      search,
      sortBy,
      sortOrder,
    });
  }

  @ApiOperation({ summary: 'Get most popular products' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of popular products to return (default: 5)',
  })
  @Get('/popular')
  async getMostPopularProducts(@Query('limit') limit?: number) {
    const parsedLimit = limit ? +limit : 10;
    return await this.productService.getMostPopularProducts(parsedLimit);
  }

}
