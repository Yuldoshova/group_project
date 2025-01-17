// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Type } from './entity/type.entity';
// import { CreateTypeDto } from './dto/createType.dto';
// import { UpdateTypeDto } from './dto/updateType.dto';

// @Injectable()
// export class TypeService {
//   constructor(
//     @InjectRepository(Type)
//     private readonly typeRepository: Repository<Type>,
//   ) {}

//   async create(createTypeDto: CreateTypeDto): Promise<Type> {
//     const type = this.typeRepository.create(createTypeDto);
//     return await this.typeRepository.save(type);
//   }

//   async findAll(): Promise<Type[]> {
//     return await this.typeRepository.find();
//   }

//   async findOne(id: number): Promise<any> {
//     return await this.typeRepository.findOne(id);
//   }

//   async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
//     const type = await this.findOne(id);
//     if (!type) {
//       throw new Error('Type not found');
//     }

//     Object.assign(type, updateTypeDto);
//     return await this.typeRepository.save(type);
//   }

//   async remove(id: number): Promise<void> {
//     const type = await this.findOne(id);
//     if (!type) {
//       throw new Error('Type not found');
//     }
//     await this.typeRepository.remove(type);
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entity/type.entity';
import { CreateTypeDto } from './dto/createType.dto';
import { UpdateTypeDto } from './dto/updateType.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  // Create a new Type
  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = this.typeRepository.create(createTypeDto); // DTO'dan yangi ob'ekt yaratish
    return await this.typeRepository.save(type); // Saqlash
  }

  // Get all types
  async findAll(): Promise<Type[]> {
    return await this.typeRepository.find(); // Barcha Type'larni olish
  }

  // Get a Type by ID (to'g'ri ishlash uchun findOne'ni tuzatish)
  async findOne(id: number): Promise<Type> {
    return await this.typeRepository.findOne({
      where: { id }, // id bo'yicha topish
    });
  }

  // Update a Type by ID
  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const type = await this.findOne(id);
    if (!type) {
      throw new Error('Type not found');
    }

    // Yangi qiymatlar bilan yangilash
    Object.assign(type, updateTypeDto);
    return await this.typeRepository.save(type);
  }

  // Delete a Type by ID
  async remove(id: number): Promise<void> {
    const type = await this.findOne(id);
    if (!type) {
      throw new Error('Type not found');
    }
    await this.typeRepository.remove(type); // Type'ni o'chirish
  }
}
