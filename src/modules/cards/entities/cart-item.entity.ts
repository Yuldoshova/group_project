import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card.entity";
import { ProductItem } from "src/modules/product-item/entities/product-item.entity";

@Entity({name: 'cartItme'})
export class CartItem{
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(()=> Card,(cart)=> cart.cartItem,{cascade: true})
    @JoinColumn({name: 'cart_id'})
    cart_id: Card


    @ManyToOne(()=> ProductItem,(productItem)=> productItem.cartItem,{cascade: true})
    @JoinColumn({name: 'product_item_id'})
    product_item_id: Array<ProductItem>

    @Column({type: 'int'})
    quantity: number

}