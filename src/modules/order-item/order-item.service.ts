import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
// import { OrderItem } from './order-item.entity';
// import { CreateOrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(dto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create({
      //   order: { id: dto.orderId },
      productId: dto.productId,
      quantity: dto.quantity,
      price: dto.price,
    });
    return this.orderItemRepository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({ relations: ['order'] });
  }

  async findOne(id: number): Promise<OrderItem> {
    return this.orderItemRepository.findOne({
      where: { id },
      relations: ['order'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}
