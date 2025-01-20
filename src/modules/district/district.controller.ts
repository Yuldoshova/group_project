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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district';
import { UpdateDistrictDto } from './dto/update-district';

@ApiTags('Distract')
@Controller('distract')
export class DistrictController {
  constructor(private readonly distractService: DistrictService) {}

  @Post()
  @ApiOperation({ summary: 'Create an distract' })
  @ApiResponse({ status: 201, description: 'Distract created successfully.' })
  create(@Body() dto: CreateDistrictDto) {
    return this.distractService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all distract' })
  @ApiResponse({ status: 200, description: 'List of all distract.' })
  findAll() {
    return this.distractService.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get distract by ID' })
  @ApiResponse({ status: 200, description: 'Distract details.' })
  findOne(@Param('id') id: number) {
    return this.distractService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an distract' })
  @ApiResponse({ status: 200, description: 'Distract updated successfully.' })
  update(@Param('id') id: number, @Body() dto: UpdateDistrictDto) {
    return this.distractService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an distract' })
  @ApiResponse({ status: 200, description: 'Distract deleted successfully.' })
  remove(@Param('id') id: number) {
    return this.distractService.remove(id);
  }
}
