import { reviewValue } from "src/utils";
import { Product } from "src/modules/product/entities/product.entity";
import { User } from "src/modules/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
        nullable: true,
        type: 'enum',
        enum: reviewValue,
      })
      value: reviewValue;
      

}