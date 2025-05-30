import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Test } from 'src/comman/test-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Test()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  private async Login(@Body() user: { email: string; password: string }) {
    return await this.authService.Login(user);
  }

  @Post('signup')
  private async Signup(@Body() createDto: CreateUserDto) {
    return await this.authService.signUp(createDto);
  }
}
