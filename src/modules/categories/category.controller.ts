/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategory } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Category')
@Controller({ version: '1', path: 'categories' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoryService.createCategory(createCategoryDto, image);
  }

  @Get('/all')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/single/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(+id);
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategory: UpdateCategory,
  ) {
    return this.categoryService.update(id, updateCategory);
  }

  @Delete('/remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
