import { User } from "src/modules/user";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity('cards')
export class Card{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User,(user)=> user.id)
    user: User

    @OneToMany(()=> CartItem,(cartItem)=> cartItem.cart_id,{onDelete: 'CASCADE'})
    cartItem: Array<CartItem>
}