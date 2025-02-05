import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from 'src/client';
import { User } from '../user/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user';
import { UploadService } from '../upload';
import { Card } from '../cards/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Card])],
  controllers: [AuthController],
  providers: [AuthService, UserService, RedisService, UploadService],
})
export class AuthModule { }
