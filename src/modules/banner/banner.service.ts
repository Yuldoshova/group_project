import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { UpdateBannerDto } from './dto/update.banner.dto';
import { CreateBannerDto } from './dto/create-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  //   async create(createBannerDto: CreateBannerDto): Promise<Banner> {
  //     const banner = this.bannerRepository.create(createBannerDto);
  //     return await this.bannerRepository.save(banner);
  //   }

  async create(
    createBannerDto: CreateBannerDto,
    image: string,
  ): Promise<Banner> {
    const banner = this.bannerRepository.create({
      ...createBannerDto,
      image,
    });

    return await this.bannerRepository.save(banner);
  }

  async findAll(): Promise<Banner[]> {
    return await this.bannerRepository.find({ relations: ['type'] });
  }

  async findOne(id: number): Promise<Banner> {
    return await this.bannerRepository.findOne({
      where: { id },
      relations: ['type'],
    });
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    await this.bannerRepository.update(id, updateBannerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bannerRepository.delete(id);
  }
}
