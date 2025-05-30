import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { HashingProvider } from 'src/auth/provider/hashingProvider';
import { JwtService } from '@nestjs/jwt';
import authConfig from 'src/auth/config/auth.config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
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

  public async loginUser(payload: { email: string; password: string }) {
    const existUser = await this.FindUserByEmail(payload.email);

    if (!existUser) {
      return { message: 'user not found ' };
    } else {
      const compairPassword = await this.hashingProvider.comparePassword(
        payload.password,
        existUser.password,
      );
      if (!compairPassword) {
        return { message: 'password not match' };
      } else {
        const genrateToken = await this.jwtService.signAsync(
          {
            email: existUser.email,
            id: existUser.id,
          },
          {
            secret: this.authConfiguration.secret,
            expiresIn: this.authConfiguration.expiresIn,
          },
        );
        const data = [{ ...existUser, token: genrateToken }];
        return { message: 'user has login', data };
      }
    }
  }
  public async deleteUser(id: number) {
    await this.UserRepository.delete(id);

    return { deleted: true };
  }

  public async FindUserById(id: number) {
    return await this.UserRepository.findOneBy({ id });
  }

  public async FindUserByEmail(email: string): Promise<User> {
    let findUser: User | null;
    try {
      findUser = await this.UserRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'timeOut error',
      });
    }
    if (!findUser) {
      throw new UnauthorizedException('User Not Found');
    }
    return findUser;
  }
}
