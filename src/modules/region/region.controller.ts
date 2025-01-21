import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @ApiOperation({ summary: 'Create an region' })
  @ApiResponse({ status: 201, description: 'Region created successfully.' })
  create(@Body() dto: CreateRegionDto) {
    return this.regionService.create(dto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all Region' })
  @ApiResponse({ status: 200, description: 'List of all Region.' })
  findAll() {
    return this.regionService.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Region by ID' })
  @ApiResponse({ status: 200, description: 'Region details.' })
  findOne(@Param('id') id: number) {
    return this.regionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an Region' })
  @ApiResponse({ status: 200, description: 'Region updated successfully.' })
  update(@Param('id') id: number, @Body() dto: UpdateRegionDto) {
    return this.regionService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Region' })
  @ApiResponse({ status: 200, description: 'Region deleted successfully.' })
  remove(@Param('id') id: number) {
    return this.regionService.remove(id);
  }
}
