import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { ProductItem } from 'src/modules/product-item/entities/product-item.entity';

@Entity('orderItem')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id', type: 'number' })
  @ManyToOne(() => Order, (order) => order.id)
  orderId: number;

  @Column({ name: 'productItem', type: 'date', nullable: true })
  @ManyToOne(() => ProductItem, (productItem) => productItem.id)
  productItem: ProductItem;

  @Column({
    type: 'integer',
  })
  quantity: number;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
