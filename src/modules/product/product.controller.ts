import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsFilterDto } from './dto/filter-product.dto';

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('add')
  async addProduct(@Body() createProductDto: CreateProductDto) {
    console.log('Received Product Data: +++', createProductDto);  // To'liq ma'lumotni log qilish
    // if (!createProductDto.name || !createProductDto.image) {
    //     throw new Error('Required fields are missing');
    // }
    // return "+++"
    return this.productService.createProduct(createProductDto);
  }

  
  @Get("/all")
  findAll(@Query('page')page:number,@Query('limit')limit: number) {
    return this.productService.findAll(page,limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }


  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
