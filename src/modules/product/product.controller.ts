import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller({ version: "1" })
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post("/products/add")
  createProduct(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.createProduct(createProductDto);
  }

  @Get("/products/all")
  findAllProduct() {
    return this.productService.findAll();
  }

  @Get('/products/single/:id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch('/products/update/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/products/delete:id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Post("/product-items/add")
  createProductItem(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.createProduct(createProductDto);
  }

  @Get("/product-items/all")
  findAllProductItem() {
    return this.productService.findAll();
  }

  @Get('/product-items/single/:id')
  findOneProductItem(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch('/product-items/update/:id')
  updateProductItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/product-items/delete:id')
  removeProductItem(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
