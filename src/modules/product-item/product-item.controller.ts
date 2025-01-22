import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Product-item")
@Controller({ version: "1", path: "product-items" })
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) { }

  @Post("/add/:productId")
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductItemDto: CreateProductItemDto,
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productItemService.create({...createProductItemDto, productId}, image);
  }

  @Get("/all")
  findAll() {
    return this.productItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductItemDto: UpdateProductItemDto) {
    return this.productItemService.update(+id, updateProductItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productItemService.remove(+id);
  }
}
