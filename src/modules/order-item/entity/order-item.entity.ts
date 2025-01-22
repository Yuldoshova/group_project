import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  //   @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  //   @ApiProperty()
  //   order: Order;

  @Column()
  @ApiProperty()
  productId: number;

  @Column('int')
  @ApiProperty()
  quantity: number;

  @Column('decimal')
  @ApiProperty()
  price: number;
}
