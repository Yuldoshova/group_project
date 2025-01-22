import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Color } from "./color.entity";
import { Brand } from "modules/brand/entities/brand.entity";
import { Category } from "modules/categories/entities/category.entities";
import { ProductItem } from "./productItem.entity";
import { Review } from "modules/review/model/review.model";
import { CartItem } from "modules/cards/entities/cardItem.entity";

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

  @OneToMany(() => CartItem, (cartItem) => cartItem.product_item)
  cartItems: Array<CartItem>

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
