import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './etity/region.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = this.regionRepository.create(createRegionDto);
    return await this.regionRepository.save(region);
  }

  async find(): Promise<Region[]> {
    return await this.regionRepository.find();
  }

  async findOne(id: number): Promise<Region> {
    return await this.regionRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    await this.regionRepository.update(id, updateRegionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.regionRepository.delete(id);
  }
}
