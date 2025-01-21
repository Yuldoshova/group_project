import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductItem } from 'modules/product/entities/productItem.entity';
import { User } from 'modules/user/entities/user.entity';
import { OrderItem } from './entity/orderItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, ProductItem, User, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
