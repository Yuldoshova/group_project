import { Color } from "src/modules/color";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product_items" })
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "image", type: "varchar", nullable: false })
    image: string

    @Column({ name: "price", type: "integer", nullable: false })
    price: number

    @Column({ name: "amount", type: "integer", nullable: true, default: 1 })
    amount: number

    @ManyToOne(() => Product, (product) => product.productItems)
    product: Product

    @ManyToOne(() => Color, (color) => color.productItems)
    color: Color

}
