import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';
import { Repository } from 'typeorm';
import { Variation } from './entities/variation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VariationService {
  constructor(
    @InjectRepository(Variation)
    private variationRepository: Repository<Variation>
  ) { }

  async create(create: CreateVariationDto) {
    const conflictVariation = await this.variationRepository.findOneBy({
      name: create.name
    });
    if (conflictVariation) {
      throw new ConflictException('Variation already exists❗');
    }

    const newVariation = this.variationRepository.create({

    });

    await this.variationRepository.save(newVariation);

    return {
      message: 'Success✅',
      data: newVariation,
    };
  }

  async findAll() {
    const variations = await this.variationRepository.find();
    return {
      message: 'Success✅',
      data: variations,
    };
  }

  async findOne(id: number) {
    const findVariation = await this.variationRepository.findOne({ where: { id } });
    if (!findVariation) {
      throw new NotFoundException('Variation not found❗');
    }
    return {
      message: 'Success✅',
      data: findVariation,
    };
  }

  async update(id: number, update: UpdateVariationDto) {
    const [findVariation, conflictVariation] = await Promise.all([
      this.variationRepository.findOne({ where: { id } }),
      this.variationRepository.findOneBy({name:update.name}),
    ]);

    if (!findVariation) {
      throw new NotFoundException('Variation not found❗');
    }
    if (conflictVariation) {
      throw new ConflictException('Variation already exists❗');
    }

    await this.variationRepository.update({ id }, { ...update });

    return {
      message: 'Success✅',
      data: id,
    };
  }

  async remove(id: number) {
    const findVariation = await this.variationRepository.findOne({ where: { id } });
    if (!findVariation) {
      throw new NotFoundException('Variation not found❗');
    }
    this.variationRepository.delete({ id });
    return {
      message: 'Success✅',
      data: id,
    };
  }
}
