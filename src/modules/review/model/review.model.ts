import { Product } from "modules/product/entities/product.entity";
import { User } from "modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { reviewValue } from "utils/review-value.enum";

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", nullable: true })
    comment: string

    @ManyToOne(() => User, (user) => user.reviews)
    user: User

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product

    @Column({
        type: "enum",
        enum: reviewValue,
        nullable: true
    })
    value: reviewValue

}