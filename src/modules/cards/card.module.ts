import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardService } from "./card.service";
import { Cardcontroller } from "./card.controller";

@Module({
    imports :[TypeOrmModule.forFeature([Card])],
    providers: [CardService],
    controllers:[Cardcontroller]
    
})
export class CardModule{

}