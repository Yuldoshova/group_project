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
  import { PromotionService } from './promotion.service';
  import { CreatePromotionDto } from './dto/createPromotion.dto';
  import { UpdatePromotionDto } from './dto/update.Promotion.dto';
  
  @Controller('promotions')
  export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}
  
    @Get()
    findAll() {
      return this.promotionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.promotionService.findOne(id);
    }
  
    @Post()
    create(@Body() createPromotionDto: CreatePromotionDto) {
      return this.promotionService.create(createPromotionDto);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePromotionDto: UpdatePromotionDto,
    ) {
      return this.promotionService.update(id, updatePromotionDto); 
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.promotionService.remove(id);
    }
  }
  



  