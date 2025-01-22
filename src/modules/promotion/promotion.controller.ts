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
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/createPromotion.dto';
import { UpdatePromotionDto } from './dto/update.Promotion.dto';

@ApiTags('Promotion')
@Controller({ version: "1", path: "promotions" })
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all promotions' })
  @ApiResponse({ status: 200, description: 'List of all promotions retrieved successfully.' })
  findAll() {
      return this.promotionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a promotion by ID' })
  @ApiResponse({ status: 200, description: 'The promotion has been retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
      return this.promotionService.findOne(id);
  }

  @Post('/add')
  @ApiOperation({ summary: 'Create a new promotion' })
  @ApiResponse({ status: 201, description: 'The promotion has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createPromotionDto: CreatePromotionDto) {
      return this.promotionService.create(createPromotionDto);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update a promotion by ID' })
  @ApiResponse({ status: 200, description: 'The promotion has been updated successfully.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
      return this.promotionService.update(id, updatePromotionDto); 
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a promotion by ID' })
  @ApiResponse({ status: 200, description: 'The promotion has been deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
      return this.promotionService.remove(id);
  }
}

  



  