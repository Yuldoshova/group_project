import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './etity/region.entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
