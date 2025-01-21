import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Controller({ version: "1" })
export class VariationController {
  constructor(private readonly variationService: VariationService) { }

  @Post("/variations/add")
  createVariation(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.create(createVariationDto);
  }

  @Get("/variations/all")
  findAllVariation() {
    return this.variationService.findAll();
  }

  @Get('/variations/single/:id')
  findOneVariation(@Param('id') id: string) {
    return this.variationService.findOne(+id);
  }

  @Patch('/variations/update/:id')
  updateVariation(@Param('id') id: string, @Body() updateVariationDto: UpdateVariationDto) {
    return this.variationService.update(+id, updateVariationDto);
  }

  @Delete('/variations/remove/:id')
  removeVariation(@Param('id') id: string) {
    return this.variationService.remove(+id);
  }

  @Post("/variation-options/add")
  createVariationOption(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.create(createVariationDto);
  }

  @Get("/variations-options/all")
  findAllVariationOption() {
    return this.variationService.findAll();
  }

  @Get('/variations-options/single/:id')
  findOneVariationOption(@Param('id') id: string) {
    return this.variationService.findOne(+id);
  }

  @Patch('/variations-options/update/:id')
  updateVariationOption(@Param('id') id: string, @Body() updateVariationDto: UpdateVariationDto) {
    return this.variationService.update(+id, updateVariationDto);
  }

  @Delete('/variations-options/remove/:id')
  removeVariationOption(@Param('id') id: string) {
    return this.variationService.remove(+id);
  }
}
