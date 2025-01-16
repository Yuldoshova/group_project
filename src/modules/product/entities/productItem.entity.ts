import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product_items" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "image", type: "varchar", nullable: true })
    image: string

    @Column({ name: "price", type: "integer", nullable: false })
    price: number

    @Column({ name: "amount", type: "integer", nullable: true })
    amount: number

    @Column({ name: "product_id", type: "integer", nullable: true })
    product_id: number


}
