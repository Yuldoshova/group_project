import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cardItem.entity";

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    user_id: number;

    @OneToMany(() => CartItem, (cartItem) => cartItem.card)
    cartItem: CartItem[];
}
