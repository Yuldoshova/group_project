import { User } from "modules/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'address' })
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    city: string

    @Column({ type: "varchar" })
    street: string

    @Column({ type: "varchar" })
    house_number: string

    @Column({ type: "int" })
    district_id: number

    @OneToMany(() => User, (user) => user.address)
    users: User[];
}
