import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { VariationOption } from "./variation-option.entity"
import { Category } from "src/modules/categories/entities/category.entities"

@Entity({ name: "variations" })
export class Variation {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "name", type: "varchar", nullable: false, unique: true })
    name: string

    @ManyToOne(() => Category, (category) => category.variations)
    category: Category

    @OneToMany(() => VariationOption, (option) => option.variation)
    options: Array<VariationOption>
}
