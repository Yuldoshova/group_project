import { Injectable, OnModuleInit } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserRoles } from "utils/user-role.enum";

@Injectable()
export class UserSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedUsers();
  }

  async seedUsers(): Promise<void> {
    const usersCount = await this.userRepository.count();

    if (usersCount === 0) {
      await this.userRepository.save({
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "+998912345678",
        role: UserRoles.ADMIN,
      });
    }
  }
}
