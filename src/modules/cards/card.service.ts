import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { Repository } from "typeorm";
import { CreateCardDto } from "./dto/card-create.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { CreateCartItemDto } from "./dto/create-cartItem.dto";
import { CartItem } from "./entities/cardItem.entity";
import { ProductItem } from "modules/product/entities/productItem.entity";
import { UpdateCartItemDto } from "./dto/update-cardItem.dto";

@Injectable()
export class CardService{

    constructor(
        @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
        @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(ProductItem) private readonly productRepository: Repository<ProductItem>,

    ){}
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

    async createCartItem(cardItemData: CreateCartItemDto) {
        const productItem = await this.productRepository.findOne({ where: { id: cardItemData.product_item_id } });
        // if (!productItem) {
        //     throw new NotFoundException("Product item not found");
        // }
    
        const card = await this.cardRepository.findOne({ where: { id: cardItemData.card_id } });
        if (!card) {
            throw new NotFoundException("Card not found");
        }
    
        const cartItem = this.cartItemRepository.create({
            quentity: cardItemData.quentity,
            product_item: productItem,
            card: card 
        });
    
        return await this.cartItemRepository.save(cartItem);
    }
    

    async getCartItemsByCardId(cardId: number) {
        const card = await this.cardRepository.findOne({ where: { id: cardId }, relations: ['cardItems'] });
        if (!card) {
            throw new NotFoundException("Card not found");
        }

        return card.cartItem; 
    }

    async updateCartItem(id: number, cardItemData: UpdateCartItemDto) {
        const cartItem = await this.cartItemRepository.findOne({ where: { id } });
        // if (!cartItem) {
        //     throw new NotFoundException("CartItem not found");
        // }
    
        cartItem.quentity = cardItemData.quentity;
    
        // const productItem = await this.productRepository.findOne({ where: { id: cardItemData.product_item_id } });
        // if (!productItem) {
        //     throw new NotFoundException("ProductItem not found");
        // }
        // cartItem.product_item = productItem; 
    
        // const card = await this.cardRepository.findOne({ where: { id: cardItemData.card_id } });
        // if (!card) {
        //     throw new NotFoundException("Card not found");
        // }
        // cartItem.card = card;
    
        return await this.cartItemRepository.save(cartItem);
    }

    async deleteCartItem(id: number) {
        const cartItem = await this.cartItemRepository.findOne({ where: { id } });
        if (!cartItem) {
            throw new NotFoundException("CartItem not found");
        }
        return await this.cartItemRepository.remove(cartItem);
    }


}