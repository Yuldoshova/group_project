// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
// } from '@nestjs/common';
// import { TypeService } from './type.service';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { CreateTypeDto } from './dto/createType.dto';
// import { UpdateTypeDto } from './dto/updateType.dto';
// import { Type } from './entity/type.entity';

// @ApiTags('types')
// @Controller('types')
// export class TypeController {
//   constructor(private readonly typeService: TypeService) {}

//   @Post()
//   @ApiOperation({ summary: 'Type yaratish' })
//   @ApiResponse({
//     status: 201,
//     description: 'Type muvaffaqiyatli yaratildi.',
//     type: Type,
//   })
//   create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
//     return this.typeService.create(createTypeDto);
//   }

//   @Get()
//   @ApiOperation({ summary: "Barcha Type'larni olish" })
//   @ApiResponse({
//     status: 200,
//     description: "Barcha Type'lar muvaffaqiyatli olindi.",
//     type: [Type],
//   })
//   findAll(): Promise<Type[]> {
//     return this.typeService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: "Type ni ID bo'yicha olish" })
//   @ApiResponse({
//     status: 200,
//     description: 'Type muvaffaqiyatli topildi.',
//     type: Type,
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Type topilmadi.',
//   })
//   findOne(@Param('id') id: number): Promise<Type> {
//     return this.typeService.findOne(id);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Type ni yangilash' })
//   @ApiResponse({
//     status: 200,
//     description: 'Type muvaffaqiyatli yangilandi.',
//     type: Type,
//   })
//   update(
//     @Param('id') id: number,
//     @Body() updateTypeDto: UpdateTypeDto,
//   ): Promise<Type> {
//     return this.typeService.update(id, updateTypeDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: "Type ni o'chirish" })
//   @ApiResponse({
//     status: 204,
//     description: "Type muvaffaqiyatli o'chirildi.",
//   })
//   remove(@Param('id') id: number): Promise<void> {
//     return this.typeService.remove(id);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTypeDto } from './dto/createType.dto';
import { Type } from './entity/type.entity';
import { UpdateTypeDto } from './dto/updateType.dto';

@ApiTags('types')
@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @ApiOperation({ summary: 'Type yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Type muvaffaqiyatli yaratildi.',
    type: Type,
  })
  create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return this.typeService.create(createTypeDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha Type'larni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha Type'lar muvaffaqiyatli olindi.",
    type: [Type],
  })
  findAll(): Promise<Type[]> {
    return this.typeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Type ni ID bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: 'Type muvaffaqiyatli topildi.',
    type: Type,
  })
  @ApiResponse({
    status: 404,
    description: 'Type topilmadi.',
  })
  findOne(@Param('id') id: number): Promise<Type> {
    return this.typeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Type ni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Type muvaffaqiyatli yangilandi.',
    type: Type,
  })
  update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateTypeDto,
  ): Promise<Type> {
    return this.typeService.update(id, updateTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Type ni o'chirish" })
  @ApiResponse({
    status: 204,
    description: "Type muvaffaqiyatli o'chirildi.",
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.typeService.remove(id);
  }
}
