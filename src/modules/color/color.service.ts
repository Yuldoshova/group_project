import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorService {

  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>
  ) { }

  async create(create: CreateColorDto) {
    const conflictColor = await this.colorRepository.findOneBy({
      code: create.code,
    });
    if (conflictColor) {
      throw new ConflictException('Color code already exists❗');
    }
    const newColor = this.colorRepository.create(create);

    await this.colorRepository.save(newColor);

    return newColor
  }

  async findAll() {
    return await this.colorRepository.find({
      relations: ["product_items"]
    });
  }

  async findOne(id: number) {
    const findColor = await this.colorRepository.findOne({ where: { id } });
    if (!findColor) {
      throw new NotFoundException('Color not found❗');
    }
    return findColor
  }

  async update(id: number, update: UpdateColorDto) {
    const [findColor, conflictUser] = await Promise.all([
      this.colorRepository.findOne({ where: { id } }),
      this.colorRepository.findOneBy({ code: update.code }),
    ]);

    if (!findColor) {
      throw new NotFoundException('Color not found❗');
    }
    if (conflictUser) {
      throw new ConflictException('Color code already exists❗');
    }

    return await this.colorRepository.update({ id }, { ...update });
  }

  async remove(id: number) {
    const findColor = await this.colorRepository.findOne({ where: { id } });
    if (!findColor) {
      throw new NotFoundException('Color not found❗');
    }

    return this.colorRepository.delete({ id });
  }
}
