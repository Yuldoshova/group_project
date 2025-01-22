import { ProductItem } from "modules/product/entities/productItem.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card.entity";

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    quentity: number;

    @ManyToOne(() => ProductItem, (productItem) => productItem.id)
    @JoinColumn({ name: 'product_item_id' })
    product_item: ProductItem;

    @ManyToOne(() => Card, (card) => card.cartItem)
    @JoinColumn({ name: 'card_id' })
    card: Card;
}
