import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TweetDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  hashTag?: number[];
}
