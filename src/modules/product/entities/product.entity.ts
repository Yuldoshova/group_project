import { Brand } from "src/modules/brand/entities";
import { Category } from "src/modules/categories/entities/category.entities";
import { ProductItem } from "src/modules/product-item/entities/product-item.entity";
import { Review } from "src/modules/review/model/review.model";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "image", type: "varchar", nullable: false })
  image: string

  @Column({ name: "name", type: "varchar", length: 100, nullable: false })
  name: string

  @Column({ name: "description", type: "varchar", nullable: true })
  description: string

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand

  @ManyToOne(() => Category, (category) => category.products)
  category: Category

  @OneToMany(() => ProductItem, (productItem) => productItem.product)
  productItems: Array<ProductItem>

  @OneToMany(() => Review, (review) => review.product)
  reviews: Array<Review>

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
