import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/orderItem.entity';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
import { ProductItem } from 'modules/product/entities/productItem.entity';
import { User } from 'modules/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(OrderItem)
    private productItemRepository: Repository<ProductItem>,

    @InjectRepository(OrderItem)
    private userRepository: Repository<User>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    // Foydalanuvchini topish
    const user = await this.userRepository.findOne({
      where: { id: createOrderDto.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const order = this.orderRepository.create({
      // user: user,
      totalPrice: createOrderDto.totalPrice,
      status: createOrderDto.status,
      orderDate: createOrderDto.orderDate,
      orderAddressId: createOrderDto.orderAddressId,
    });

    await this.orderRepository.save(order);

    return {
      message: 'Success✅',
      data: order,
    };
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderItems'],
    });
  }

  async update(id: number, updateOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }

    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }

    await this.orderRepository.remove(order);
  }

  async createOrderItem(createOrderItemDto: CreateOrderItemDto) {
    const product = await this.userRepository.findOne({
      where: { id: createOrderItemDto.productItem },
    });

    if (!product) {
      throw new Error('USer not found');
    }

    const orderItem = this.orderItemRepository.create({
      quantity: createOrderItemDto.quantity,
      price: createOrderItemDto.price,
      productItem: product,
    });

    return await this.orderItemRepository.save(orderItem);
  }
}
