import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entity/district.entity';
import { CreateDistrictDto } from './dto/create-district';
import { UpdateDistrictDto } from './dto/update-district';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = this.districtRepository.create(createDistrictDto);
    return await this.districtRepository.save(district);
  }

  async findOne(id: number): Promise<District> {
    return await this.districtRepository.findOne({
      where: { id },
    });
  }

  async find(): Promise<District[]> {
    return await this.districtRepository.find();
  }

  async update(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    await this.districtRepository.update(id, updateDistrictDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.districtRepository.delete(id);
  }
}
