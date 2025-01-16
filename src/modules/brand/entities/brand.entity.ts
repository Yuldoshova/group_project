import { Category } from 'modules/categories/entities/category.entities';
import { Product } from 'modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Array<Product>

  @OneToMany(() => Category, (category) =>category.brand)
  categories: Array<Category>
}
