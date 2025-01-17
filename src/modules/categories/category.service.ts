// import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entities';
import { Repository } from 'typeorm';
import { UpdateCategory } from './dto/update-category.dto.js';
import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { UploadService } from 'modules/uploads/upload.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private uploadService: UploadService
  ) { }

  async createCategory(create: CreateCategoryDto, image: Express.Multer.File) {
    const uploadImage = await this.uploadService.uploadFile({
      file: image,
      destination: "uploads/categories/images"
    })


    const existingCategory = await this.categoryRepository.findOne({
      where: { name: create.name },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists❗');
    }

    const newCategory = this.categoryRepository.create({
      name: create.name,
      image: uploadImage.imageUrl
    });

    await this.categoryRepository.save(newCategory);

    return {
      message: 'Success✅',
      data: newCategory,
    };
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return {
      message: 'Success✅',
      data: categories,
    };
  }

  async findOne(id: number) {
    const findOne = await this.categoryRepository.findOne({
      where: { id },
    });
    return {
      message: 'Success✅',
      data: findOne,
    };
  }

  async update(id: number, update: UpdateCategory) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found❗');
    }

    if (update.name && update.name !== existingCategory.name) {
      const duplicateCategory = await this.categoryRepository.findOne({
        where: { name: update.name },
      });

      if (duplicateCategory) {
        throw new ConflictException('Category with this name already exists❗');
      }
    }

    await this.categoryRepository.update({ id }, { ...update });

    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    return {
      message: 'Success✅',
      data: updatedCategory,
    };
  }

  async remove(id: number) {
    const findCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!findCategory) {
      throw new NotFoundException('Category not found❗');
    }
    this.categoryRepository.delete({ id });
    return {
      message: 'Success✅',
      data: id,
    };
  }
}
