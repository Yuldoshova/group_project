import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { CardService } from './card.service';
  import { CreateCardDto } from './dto/card-create.dto';
  import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCartItemDto } from './dto/cartItem-create.dto';
import { UpdateCartItemDto } from './dto/cartItem-update.dto';
  
  @ApiTags('Card')
  @Controller({ version: '1', path: 'cards' })
  export class CardController {
    constructor(private readonly cardService: CardService) {}
  
    @Get()
    @ApiOperation({ summary: 'Retrieve all cards' })
    @ApiResponse({
      status: 200,
      description: 'List of all cards retrieved successfully.',
    })
    findAll() {
      return this.cardService.getAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a card by ID' })
    @ApiResponse({
      status: 200,
      description: 'The card has been retrieved successfully.',
    })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.cardService.getOne(id);
    }
  
    
    @Patch('/update/:id')
    @ApiOperation({ summary: 'Update a card by ID' })
    @ApiResponse({
      status: 200,
      description: 'The card has been updated successfully.',
    })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCardDto: UpdateCardDto,
    ) {
      return this.cardService.update(id, updateCardDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a card by ID' })
    @ApiResponse({
      status: 200,
      description: 'The card has been deleted successfully.',
    })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.cardService.delete(id);
    }

    // Cart Item crud

    @Post('item')
    createCartItem(@Body()data: CreateCartItemDto){
      return this.cardService.createCartItem(data)
    }

    @Get('item')
    getAllCartItem(){
      return this.cardService.getAllCartItem()
    }

    @Patch('item/update/:id')
    updateCartItem(@Param('id',ParseIntPipe)id: number,update: UpdateCartItemDto){
      return this.updateCartItem(id,update)
    }

    @Delete('delete/:id')
    deleteCartItem(@Param('id',ParseIntPipe)id: number){
      return this.deleteCartItem(id)
    }
  }
  