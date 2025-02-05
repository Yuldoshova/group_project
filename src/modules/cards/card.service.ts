import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/card-create.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { User } from '../user';
import { CreateCartItemDto } from './dto/cartItem-create.dto';
import { CartItem } from './entities/cart-item.entity';
import { ProductItem } from '../product-item/entities/product-item.entity';
import { UpdateCartItemDto } from './dto/cartItem-update.dto';

@Injectable()
export class CardService {
  getOne(id: number) {
    throw new Error('Method not implemented.');
  }
  getAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,

    @InjectRepository(ProductItem)
    private productItemRepository: Repository<ProductItem>

  ) { }



  async findAll() {
    const cards = await this.cardRepository.find({
      relations: ["cartItem"]
    });

    return {
      message: 'Success ✅',
      data: cards,
    };
  }

  async findOne(id: number) {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return {
      message: 'Success ✅',
      data: card,
    };
  }

  async update(id: number, cardData: UpdateCardDto) {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    const findUser = await this.userRepository.findOne({ where: { id: cardData.user_id } })
    await this.cardRepository.update({ id }, { ...cardData, user: findUser });

    return {
      message: 'Card updated successfully ✅',
      data: id,
    };
  }

  async delete(id: number) {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    await this.cardRepository.delete({ id });

    return {
      message: 'Card deleted successfully ✅',
      data: id,
    };
  }





  //  CartItem crud

  async createCartItem(create: CreateCartItemDto) {
    const findCart = await this.cardRepository.findOne({ where: { id: create.card_id } })
    if (!findCart) {
      throw new Error("Cart not found!")
    }

    const findProductItem = await this.productItemRepository.findOne({ where: { id: create.product_item_id } })
    if (!findProductItem) {
      throw new Error("Product not found!")
    }
    const newCartItem = this.cartItemRepository.create({
      quantity: create.quantity,
      cart_id: findCart,
    })
    const newCItem = await this.cartItemRepository.save(newCartItem)
    return {
      message: "Succesfully created!",
      data: newCItem
    }
  }

  async getAllCartItem() {
    const getAll = await this.cartItemRepository.find()
    return {
      message: 'Successfully created',
      data: getAll
    }

  }

  async updateCartItem(id: number, updateCartItem: UpdateCartItemDto) {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } })
    if (!cartItem) {
      throw new Error("Cart item not found!")
    }
    const updated = await this.cartItemRepository.update({
      quantity: updateCartItem?.quantity
    }, { id })
    return {
      message: 'cart item successfully updated',
      data: updated
    }
  }
  async removeCartItem(id: number){
    const finCartItem = await this.cartItemRepository.findOne({where:{id}})
    if(!finCartItem){
      throw new Error("Cart item not found!")
    }

    const removed = await this.cartItemRepository.delete({id})
    return {
       message: 'Cart item succesfully removed',
       data: removed
    }
  }
}