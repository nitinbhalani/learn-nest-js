import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthorizedGuard } from 'src/auth/guard/authorize.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthorizedGuard)
  @Get()
  getUser() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
