import { Column, PrimaryGeneratedColumn } from "typeorm"

export class VariationOption {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "value", type: "varchar", nullable: false, unique: true })
    value: string

    @Column({ name: "variation_id", type: "integer", nullable: false })
    variation_id: number
}
