import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Variation {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "name", type: "varchar", nullable: false, unique: true })
    name: string

    @Column({ name: "category_id", type: "integer", nullable: false })
    category_id: number
}
