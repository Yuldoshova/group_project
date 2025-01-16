import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "image", type: "varchar", nullable: false })
    image: string

    @Column({ name: "name", type: "varchar", length: 100, nullable: false })
    name: string

    @Column({ name: "description", type: "varchar", nullable: true })
    description: string

    @Column({ name: "brand_id", type: "integer", nullable: true })
    brand_id: number

    @Column({ name: "category_id", type: "integer", nullable: true })
    category_id: number

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
      })
      createdAt: Date;
    
      @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
      })
      updatedAt: Date;
}
