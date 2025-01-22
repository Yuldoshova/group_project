import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { User } from './entities/user.entity';
  import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Address } from 'modules/address/entities/address.entitiy';
import { Review } from 'modules/review/model/review.model';
  
  @Injectable()
  export class UserService {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(Address)
      private addressRepository: Repository<Address>,
      @InjectRepository(Review)
      private reviewRepository: Repository<Review>
    ) {}
  
    async create(create: CreateUserDto) {
      // Email conflict tekshiruvi
      const conflictUser = await this.userRepository.findOneBy({
        email: create.email,
      });
      if (conflictUser) {
        throw new ConflictException('Email already exists❗');
      }
    
      let address: Address | null = null;
    
      if (create.address_id) {
        address = await this.addressRepository.findOneBy({
          id: create.address_id,
        });
        if (!address) {
          throw new NotFoundException('Address not found❗');
        }
      }


      let reviews: Review[] = [null];
    
      if (create.review_id) {
        const review = await this.reviewRepository.findOneBy({
          id: create.review_id,
        });
        if (!review) {
          throw new NotFoundException('Review not found❗');
        }
        reviews.push(review)
      }
    
      const newUser = this.userRepository.create({
        ...create,
        address,
        reviews

      });
    
      return await this.userRepository.save(newUser);
    }
  
    async findAll() {
      return await this.userRepository.find();
      
    }
  
    async findOne(id: number) {
      const findUser = await this.userRepository.findOne({ where: { id } });
      if (!findUser) {
        throw new NotFoundException('User not found❗');
      }
      return findUser
    }
  
    async findByEmail(email: string) {
      return await this.userRepository.findOneBy({ email });
  
      
    }
  
    async update(id: number, update: UpdateUserDto) {
      const [findUser, conflictUser] = await Promise.all([
        this.userRepository.findOne({ where: { id } }),
        this.userRepository.findOneBy({ email: update.email }),
      ]);
  
      if (!findUser) {
        throw new NotFoundException('User not found❗');
      }
      if (conflictUser) {
        throw new ConflictException('Email already exists❗');
      }
  
      await this.userRepository.update({ id }, { ...update });
  
      return {
        message: 'Success✅',
        data: id,
      };
    }
  
    async remove(id: number) {
      const findUser = await this.userRepository.findOne({ where: { id } });
      if (!findUser) {
        throw new NotFoundException('User not found❗');
      }
      this.userRepository.delete({ id });
      return {
        message: 'Success✅',
        data: id,
      };
    }
  }
  