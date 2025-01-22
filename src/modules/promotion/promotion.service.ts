import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/createPromotion.dto';
import { UpdatePromotionDto } from './dto/update.Promotion.dto';
import { Promotion } from './entities/promotion.etity';

@Injectable()
export class PromotionService {
  create(createPromotionDto: CreatePromotionDto) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}

  async createPromotion(create: CreatePromotionDto) {
    const newPromotion = this.promotionRepository.create(create);
    await this.promotionRepository.save(newPromotion);

    return {
      message: 'Success✅',
      data: newPromotion,
    };
  }

  async findAll() {
    const promotions = await this.promotionRepository.find();

    return {
      message: 'Success✅',
      data: promotions,
    };
  }

  async findOne(id: number) {
    const promotion = await this.promotionRepository.findOne({ where: { id } });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }

    return {
      message: 'Success✅',
      data: promotion,
    };
  }

  async update(id: number, update: UpdatePromotionDto) {
    const promotion = await this.promotionRepository.findOne({ where: { id } });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }

    await this.promotionRepository.update({ id }, { ...update });

    return {
      message: 'Success✅',
      data: id,
    };
  }

  async remove(id: number) {
    const promotion = await this.promotionRepository.findOne({ where: { id } });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }

    await this.promotionRepository.delete({ id });

    return {
      message: 'Success✅',
      data: id,
    };
  }
}

