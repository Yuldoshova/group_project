import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  //   ManyToOne,
  //   OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from 'src/modules/order-item/entity/order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  //   @ManyToOne(() => User, (user) => user.orders)
  //   @ApiProperty()
  //   user: User;

  //   @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  @ApiProperty({ type: () => [OrderItem] })
  items: OrderItem[];

  @Column('decimal')
  @ApiProperty()
  totalPrice: number;

  @Column({ default: 'pending' })
  @ApiProperty()
  status: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
