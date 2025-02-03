import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { Banner } from './entities/banner.entity';
import { UpdateBannerDto } from './dto/update.banner.dto';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @ApiConsumes('multipart/form-data')
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Banner> {
    if (!image) {
      throw new NotFoundException('Image file is required');
    }

    return this.bannerService.create({ ...createBannerDto, image });
  }
  @Get()
  @ApiOperation({ summary: 'Banners roʻyxatini olish' })
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bannerni ID bo‘yicha olish' })
  async findOne(@Param('id') id: number): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Bannerni yangilash' })
  @ApiBody({
    type: UpdateBannerDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    return this.bannerService.update(id, updateBannerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Bannerni oʻchirish' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.bannerService.remove(id);
  }
}
