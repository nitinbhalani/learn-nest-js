import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetDto } from './dto/tweet.dto';
import { UpdateTweetDto } from './dto/updateTweetDto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get(':userId')
  async getAllTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.getTweets(userId);
  }

  @Post()
  async createTweet(@Body() createTweet: TweetDto) {
    return this.tweetService.CreateTweet(createTweet);
  }

  @Patch()
  public async updateTweet(@Body() updateTweet: UpdateTweetDto) {
    return this.tweetService.UpdateTweet(updateTweet);
  }

  @Delete(':id')
  public async deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.DeleteTweet(id);
  }
}
