import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { reviewValue } from "utils/review-value.enum";

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", nullable: true })
    comment: string

    @Column({ type: "integer"})
    user_id: number

    @Column({ type: "integer" })
    product_id: number

    @Column({
        type: "enum",
        enum: reviewValue,
        nullable: true
    })
    value: reviewValue



}