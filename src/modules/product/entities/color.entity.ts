import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductItem } from "./productItem.entity";

@Entity({ name: "colors" })
export class Color {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "name", type: "varchar", length: 50, nullable: false })
  name: string

  @Column({ name: "code", type: "varchar", nullable: false })
  code: string

  @OneToOne(() => ProductItem, (productItem) => productItem.color)
  productItem: ProductItem
}
