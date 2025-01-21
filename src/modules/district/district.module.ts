import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entity/district.entity';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistractModule {}
