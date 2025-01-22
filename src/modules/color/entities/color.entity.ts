import { ProductItem } from "src/modules/product-item/entities/product-item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "colors" })
export class Color {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "name", type: "varchar", length: 50, nullable: false })
    name: string

    @Column({ name: "code", type: "varchar", nullable: false })
    code: string

    @OneToMany(() => ProductItem, (productItem) => productItem.color)
    productItems: Array<ProductItem>
}
