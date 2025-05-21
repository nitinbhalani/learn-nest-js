import { PartialType } from '@nestjs/mapped-types';
import { TweetDto } from './tweet.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateTweetDto extends PartialType(TweetDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
