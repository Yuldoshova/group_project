import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  // ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './orderEnum.status';
// import { User } from 'modules/user/entities/user.entity';
import { Address } from 'modules/address/entities/address.entitiy';
import { OrderItem } from './orderItem.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.order, { nullable: false }) // orderId o'rniga order deb yozildi
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @Column({ name: 'orderDate', type: 'date', nullable: true })
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column('decimal')
  totalPrice: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
  orderItems: Array<OrderItem>;

  @OneToOne(() => Address, (address) => address.id)
  orderAddressId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
