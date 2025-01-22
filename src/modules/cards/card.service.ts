import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/card-create.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  getOne(id: number) {
      throw new Error('Method not implemented.');
  }
  getAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(cardData: CreateCardDto) {
    const newCard = this.cardRepository.create(cardData);
    await this.cardRepository.save(newCard);

    return {
      message: 'Card created successfully ✅',
      data: newCard,
    };
  }

  async findAll() {
    const cards = await this.cardRepository.find();

    return {
      message: 'Success ✅',
      data: cards,
    };
  }

  async findOne(id: number) {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return {
      message: 'Success ✅',
      data: card,
    };
  }

  async update(id: number, cardData: UpdateCardDto) {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    await this.cardRepository.update({ id }, { ...cardData });

    return {
      message: 'Card updated successfully ✅',
      data: id,
    };
  }

  async delete(id: number) {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    await this.cardRepository.delete({ id });

    return {
      message: 'Card deleted successfully ✅',
      data: id,
    };
  }
}