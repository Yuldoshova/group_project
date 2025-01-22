import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/createBrand.dto';
import { UpdateBrandDto } from './dto/updateBrand.dto';

@ApiTags('Brands')
@Controller({ version: '1', path: 'brands' })
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({ status: 201, description: 'The brand has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body(new ValidationPipe()) createBrandDto: CreateBrandDto) {
    try {
      const brand = await this.brandService.create(createBrandDto);
      return {
        message: 'Brand created successfully✅',
        data: brand,
      };
    } catch (error) {
      console.error('Brand creation error:', error);
      throw new HttpException(
        'Brand creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all brands' })
  @ApiResponse({ status: 200, description: 'List of all brands retrieved successfully.' })
  async findAll() {
    try {
      const brands = await this.brandService.findAll();
      return {
        message: 'Brands retrieved successfully✅',
        data: brands,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch brands',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a brand by ID' })
  @ApiResponse({ status: 200, description: 'The brand has been retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const brand = await this.brandService.findOne(id);
      return {
        message: 'Brand retrieved successfully✅',
        data: brand,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch brand',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiResponse({ status: 200, description: 'The brand has been updated successfully.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateBrandDto: UpdateBrandDto,
  ) {
    try {
      const updatedBrand = await this.brandService.update(id, updateBrandDto);
      return {
        message: 'Brand updated successfully✅',
        data: updatedBrand,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update brand',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiResponse({ status: 200, description: 'The brand has been deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.brandService.remove(id);
      return {
        message: 'Brand deleted successfully✅',
        data: id,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete brand',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


  




