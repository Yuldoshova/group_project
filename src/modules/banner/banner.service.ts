import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { UpdateBannerDto } from './dto/update.banner.dto';
import { CreateBannerDto } from './dto/create-banner.dto';
import { BannerType } from './entities/type.status';
import { UploadService } from '../upload';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    @InjectRepository(BannerType)
    private bannerTypeRepository: Repository<BannerType>,
    private uploadService: UploadService,
  ) {}

  async create(createBannerDto: CreateBannerDto): Promise<Banner> {
    const bannerType = await this.bannerTypeRepository.findOne({
      where: { id: createBannerDto.typeId },
    });

    if (!bannerType) {
      throw new NotFoundException(
        `Banner type with ID ${createBannerDto.typeId} not found`,
      );
    }

    const uploadImage = await this.uploadService.uploadFile({
      file: createBannerDto.image,
      destination: 'uploads/banners',
    });

    const banner = this.bannerRepository.create({
      ...createBannerDto,
      image: uploadImage.imageUrl,
      typeId: bannerType,
    });

    return await this.bannerRepository.save(banner);
  }

  async findAll(): Promise<Banner[]> {
    return await this.bannerRepository.find({
      relations: ['typeId', 'typeId.product', 'typeId.category'],
    });
  }

  async findOne(id: number): Promise<Banner> {
    const banner = await this.bannerRepository.findOne({
      where: { id },
      relations: ['typeId', 'typeId.product', 'typeId.category'],
    });

    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }

    return banner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    const bannerType = await this.bannerTypeRepository.findOne({
      where: { id: updateBannerDto.typeId },
    });

    if (!bannerType) {
      throw new NotFoundException(
        `Banner type with ID ${updateBannerDto.typeId} not found`,
      );
    }

    const updatedBanner = {
      ...updateBannerDto,
      typeId: bannerType,
    };

    await this.bannerRepository.update(id, updatedBanner);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bannerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
  }
}
