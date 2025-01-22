import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from './type.controller';
import { Type } from './entity/type.entity';
import { TypeService } from './type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  providers: [TypeService],
  controllers: [TypeController],
})
export class TypeModule {}
