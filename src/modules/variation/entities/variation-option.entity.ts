import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Variation } from "./variation.entity"

@Entity({ name: "variation_options" })
export class VariationOption {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "value", type: "varchar", nullable: false, unique: true })
    value: string

    @ManyToOne(() => Variation, (variation) => variation.options)
    variation: Variation
}
