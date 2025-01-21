import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { User } from './entities/user.entity';
  import { CreateUserDto } from './dto/create-users.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @Injectable()
  export class UserService {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}
  
    async create(create: CreateUserDto) {
      const conflictUser = await this.userRepository.findOneBy({
        email: create.email,
      });
      if (conflictUser) {
        throw new ConflictException('Email already exists❗');
      }
      const newUser = this.userRepository.create(create);
  
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
  