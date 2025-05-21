import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { UserModule } from 'src/user/user.module';
import { HashtagModule } from 'src/hashtag/hashtag.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [TypeOrmModule.forFeature([Tweet]), UserModule, HashtagModule],
  exports: [TweetService],
})
export class TweetModule {}
