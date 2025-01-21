import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { Repository } from "typeorm";
import { CreateCardDto } from "./dto/card-create.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardService{

    constructor(@InjectRepository(Card) private readonly cardRepository: Repository<Card>){}
    async create(cardData: CreateCardDto){
        const card = this.cardRepository.create(cardData)
        return await this.cardRepository.save(card)
    }
    async getAll(){

        const card =  await this.cardRepository.find()
        console.log(card)
        return card
    }
    async update(id: number, cardData: UpdateCardDto) {
        const updateData = await this.cardRepository.findOne({ where: { id } });
        if (!updateData) {
            throw new NotFoundException('Card not found');
        }
    
        Object.assign(updateData, cardData);
        return await this.cardRepository.save(updateData);
    }
    async delete(id: number){
        const isCard = await this.cardRepository.findOne({where:{id}})
        if(!isCard){
            return {
                message:"Card Not found",
                statusCode: 404
            }
        }
        return await this.cardRepository.remove(isCard)
    }


}