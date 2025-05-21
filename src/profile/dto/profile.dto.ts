import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class ProfileDto {
  @IsString({ message: 'firstName is required string' })
  @MinLength(3, { message: '3 oly' })
  @MaxLength(100)
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'lastName is required string' })
  @MinLength(3, { message: '3 oly' })
  @MaxLength(100)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
