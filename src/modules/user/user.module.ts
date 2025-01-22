import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Address } from 'modules/address/entities/address.entitiy';
import { Review } from 'modules/review/model/review.model';
import { Color } from 'modules/product/entities/color.entity';


@Module({
    imports:  [TypeOrmModule.forFeature([User,Address,Review,Color,])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule{}
