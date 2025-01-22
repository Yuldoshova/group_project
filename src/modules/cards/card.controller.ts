import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/card-create.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { UpdateCartItemDto } from "./dto/update-cardItem.dto";
import { CreateCartItemDto } from "./dto/create-cartItem.dto";

@ApiTags('Cards')
@Controller({ version: "1", path: "card" })
export class Cardcontroller {
    constructor(private readonly service: CardService) { }

    @ApiOperation({ summary: 'Get all cards' })
    @ApiResponse({ status: 200, description: 'Return all cards' })
    @Get()
    getAll() {
        return this.service.getAll()
    }

    @ApiOperation({ summary: 'Create a new card' })
    @ApiResponse({ status: 201, description: 'Card created successfully' })
    @Post()
    create(@Body() cardData: CreateCardDto) {
        return this.service.create(cardData)
    }

    @ApiOperation({ summary: 'Update an existing card by ID' })
    @ApiParam({ name: 'id', description: 'Card ID to update' })
    @ApiResponse({ status: 200, description: 'Card updated successfully' })
    @Put('update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() cardData: UpdateCardDto) {
        return this.service.update(id, cardData);
    }

    @ApiOperation({ summary: 'Delete a card by ID' })
    @ApiParam({ name: 'id', description: 'Card ID to delete' })
    @ApiResponse({ status: 200, description: 'Card deleted successfully' })
    @Delete(':id')
    delete(@Param('id',ParseIntPipe)id: number){
        return this.service.delete(id)
    }

    @ApiOperation({ summary: 'Create a new cart item' })
    @ApiResponse({ status: 201, description: 'Cart item created successfully' })
    @Post('item/create')
    createCartItem(@Body() cardItemData: CreateCartItemDto) {
        return this.service.createCartItem(cardItemData);
    }

    @ApiOperation({ summary: 'Get cart items by card ID' })
    @ApiParam({ name: 'cardId', description: 'Card ID to fetch cart items' })
    @ApiResponse({ status: 200, description: 'Return cart items for a specific card' })
    @Get('item/:cardId')
    getCartItemsByCardId(@Param('cardId', ParseIntPipe) cardId: number) {
        return this.service.getCartItemsByCardId(cardId);
    }

    @ApiOperation({ summary: 'Update an existing cart item by ID' })
    @ApiParam({ name: 'id', description: 'Cart item ID to update' })
    @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
    @Put('item/update/:id')
    updateCartItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() cardItemData: UpdateCartItemDto
    ) {
        return this.service.updateCartItem(id, cardItemData);
    }

    @ApiOperation({ summary: 'Delete a cart item by ID' })
    @ApiParam({ name: 'id', description: 'Cart item ID to delete' })
    @ApiResponse({ status: 200, description: 'Cart item deleted successfully' })
    @Delete('item/:id')
    deleteCartItem(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteCartItem(id);
    }
}
