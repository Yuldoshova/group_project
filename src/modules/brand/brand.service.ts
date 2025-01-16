import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "./entities/brand.entity";
import { Repository } from "typeorm";
import { CreateBrandDto, UpdateBrandDto } from "./dto/brand.dto";

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
    ) {}

    async create(createBrandDto: CreateBrandDto): Promise<Brand>{
        const brand = this.brandRepository.create(createBrandDto);
        return this.brandRepository.save(brand);
    }

    findAll(): Promise<Brand[]>{
        return this.brandRepository.find();
    }

    async findOne(id: number): Promise<Brand> {
        const brand = await this.brandRepository.findOneBy({ id });
        if (!brand) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }
        return brand;
    }

    async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand>{
        const brand = await this.findOne(id);
        Object.assign(brand, updateBrandDto);
        return this.brandRepository.save(brand);
    }

    async remove(id: number): Promise<void> {
        const brand = await this.findOne(id);
        await this.brandRepository.remove(brand);
    }
}





