import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardService } from "./card.service";
import { Cardcontroller } from "./card.controller";
import { CartItem } from "./entities/cardItem.entity";
import { ProductItem } from "modules/product/entities/productItem.entity";

@Module({
    imports :[TypeOrmModule.forFeature([Card,CartItem,ProductItem])],
    providers: [CardService],
    controllers:[Cardcontroller]
    
})
export class CardModule{

}