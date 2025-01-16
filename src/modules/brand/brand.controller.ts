import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpException,
    HttpStatus,
    ValidationPipe,
  } from '@nestjs/common';
  import { BrandService } from './brand.service';
  import { CreateBrandDto } from './dto/createBrand.dto';
import { UpdateBrandDto } from './dto/updateBrand.dto';
  
  
  @Controller('brands')
  export class BrandController {
    constructor(private readonly brandService: BrandService) {}
    @Post()
    async create(@Body(new ValidationPipe()) createBrandDto: CreateBrandDto) {
      try {
        return await this.brandService.create(createBrandDto);
      } catch (error) {
        console.error('Brand creation error:', error); // Konsolda xatolik logi
        throw new HttpException(
          'Brand creation failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    

  
    @Get()
    async findAll() {
      try {
        return await this.brandService.findAll();
      } catch (error) {
        throw new HttpException(
          'Failed to fetch brands',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      try {
        const brand = await this.brandService.findOne(id);
        if (!brand) {
          throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        }
        return brand;
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to fetch brand',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateBrandDto: UpdateBrandDto,
    ) {
      try {
        return await this.brandService.update(id, updateBrandDto);
      } catch (error) {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      try {
        return await this.brandService.remove(id);
      } catch (error) {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  




