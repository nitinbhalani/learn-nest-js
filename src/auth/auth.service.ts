import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async signUp(payload: CreateUserDto) {
    return await this.userService.createUser(payload);
  }

  public async Login(payload: { email: string; password: string }) {
    return await this.userService.loginUser(payload);
  }
}
