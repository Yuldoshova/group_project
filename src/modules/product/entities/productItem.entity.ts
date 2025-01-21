import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Color } from './color.entity';

@Entity({ name: 'product_items' })
export class ProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image: string;

  @Column({ name: 'price', type: 'integer', nullable: false })
  price: number;

  @Column({ name: 'amount', type: 'integer', nullable: true })
  amount: number;

  @ManyToOne(() => Product, (product) => product.productItems)
  product: Product;

  @OneToOne(() => Color, (color) => color.productItem)
  color: Color;
}
