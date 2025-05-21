import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ProfileDto } from 'src/profile/dto/profile.dto';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsStrongPassword()
  password: string;

  @IsOptional()
  profile: ProfileDto;
}
