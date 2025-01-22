import { Module } from '@nestjs/common';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variation } from './entities/variation.entity';
import { VariationOption } from './entities/variation-option.entity';
import { Category } from '../categories/entities/category.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Variation, VariationOption, Category])],
  controllers: [VariationController],
  providers: [VariationService],
})
export class VariationModule { }
