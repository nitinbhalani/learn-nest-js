import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { HashingProvider } from 'src/auth/provider/hashingProvider';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async getAllUsers() {
    return await this.UserRepository.find({
      relations: { profile: true },
    });
  }
  public async createUser(userDto: CreateUserDto) {
    userDto.profile = userDto.profile || {};
    const hashedPassword = await this.hashingProvider.hashPassword(
      userDto.password,
    );
    const user = this.UserRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    return await this.UserRepository.save(user);
  }

  public async deleteUser(id: number) {
    await this.UserRepository.delete(id);

    return { deleted: true };
  }

  public async FindUserById(id: number) {
    return await this.UserRepository.findOneBy({ id });
  }
}
