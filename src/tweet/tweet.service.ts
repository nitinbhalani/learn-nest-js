import { Injectable } from '@nestjs/common';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { TweetDto } from './dto/tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/updateTweetDto';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    private readonly hashTagService: HashtagService,

    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}
  public async getAllTweets() {
    return await this.tweetRepository.find();
  }

  public async CreateTweet(createTweet: TweetDto) {
    const user = await this.userService.FindUserById(createTweet.userId);

    if (!user) {
      throw new Error('User not found');
    }
    const hashTags = await this.hashTagService.findHashTag(
      createTweet.hashTag || [],
    );

    const tweet = this.tweetRepository.create({
      ...createTweet,
      user,
      hashTag: hashTags,
    });

    return await this.tweetRepository.save(tweet);
  }

  public async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  public async UpdateTweet(updateDto: UpdateTweetDto) {
    const hashTags = await this.hashTagService.findHashTag(
      updateDto.hashTag ?? [],
    );

    const tweet = await this.tweetRepository.findOneBy({ id: updateDto?.id });

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    tweet.text = updateDto.text ?? tweet.text;
    tweet.hashTag = hashTags;
    tweet.image = updateDto.image ?? tweet.image;

    return await this.tweetRepository.save(tweet);
  }

  public async DeleteTweet(id: number) {
    await this.tweetRepository.delete({ id });
    return { message: 'Tweet deleted successfully', id };
  }
}
