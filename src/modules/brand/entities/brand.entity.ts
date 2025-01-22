import { Category } from 'src/modules/categories/entities/category.entities';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false, unique: true })
  name: string;

  @Column({ name: 'image', type: 'varchar', nullable: false })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Array<Product>

  @OneToMany(() => Category, (category) => category.brand)
  categories: Array<Category>
}
