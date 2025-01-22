import { Brand } from 'src/modules/brand/entities';
import { Product } from 'src/modules/product/entities/product.entity';
import { Variation } from 'src/modules/variation/entities/variation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.categories)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image: string;

  @Column({ name: 'icon', type: 'varchar', nullable: true })
  icon: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Array<Product>

  @OneToMany(() => Variation, (variation) => variation.category)
  variations: Array<Variation>

  @OneToMany(() => Category, (category) => category.parent)
  children: Array<Category>

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
