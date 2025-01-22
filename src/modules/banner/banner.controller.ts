/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BannerService } from './banner.service';
// import { CreateBannerDto } from './dto/create-banner.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { UpdateBannerDto } from './dto/update.banner.dto';
import { Banner } from './entities/banner.entity';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBannerDto } from './dto/create-banner.dto';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
   @ApiOperation({ summary: 'Banner yaratish va rasm yuklash' })

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: "Banner va rasm ma'lumotlari",
    type: CreateBannerDto,
  })
  async create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Banner> {
    const imagePath = file ? file.filename : null;
    return this.bannerService.create(createBannerDto, imagePath);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha bannerlarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha bannerlar ro'yxati",
    type: [Banner],
  })
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Bannerni id bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Banner ma'lumotlari",
    type: Banner,
  })
  async findOne(@Param('id') id: number): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Bannerni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Banner muvaffaqiyatli yangilandi.',
    type: Banner,
  })
  update(
    @Param('id') id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    return this.bannerService.update(id, updateBannerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Bannerni o'chirish" })
  @ApiResponse({
    status: 204,
    description: "Banner muvaffaqiyatli o'chirildi.",
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.bannerService.remove(id);
  }
}
