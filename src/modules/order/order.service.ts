import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
// import { OrderItem } from 'modules/order-item/entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dtor';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    // @InjectRepository(OrderItem)
    // private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      //   user: { id: dto.userId },
      totalPrice: dto.totalPrice,
      //   ulanish qismi
      //   items: dto.items.map((item) => this.orderItemRepository.create(item)),
    });
    return this.orderRepository.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['user', 'items'] });
  }

  async getOrderById(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items'],
    });
  }

  async updateOrder(id: number, dto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, dto);
    return this.getOrderById(id);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
