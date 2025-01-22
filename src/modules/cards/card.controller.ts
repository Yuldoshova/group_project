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
  
    @Post('/add')
    @ApiOperation({ summary: 'Create a new card' })
    @ApiResponse({
      status: 201,
      description: 'The card has been successfully created.',
    })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    create(@Body() createCardDto: CreateCardDto) {
      return this.cardService.create(createCardDto);
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
  }
  