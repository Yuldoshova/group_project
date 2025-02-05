import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { User } from "../user";
import { ProductItem } from "../product-item/entities/product-item.entity";
import { CartItem } from "./entities/cart-item.entity";

@Module({
    imports :[TypeOrmModule.forFeature([Card,User,ProductItem,CartItem])],
    providers: [CardService],
    controllers:[CardController]
    
})
export class CardModule{

}