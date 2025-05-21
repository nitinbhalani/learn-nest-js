import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashTagDto } from './dto/hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashTagRepository: Repository<Hashtag>,
  ) {}

  public async createHashTag(hashTag: HashTagDto) {
    const createHashTag = this.hashTagRepository.create(hashTag);
    return await this.hashTagRepository.save(createHashTag);
  }
  public async findHashTag(hashTags: number[]) {
    return await this.hashTagRepository.find({
      where: { id: In(hashTags) },
    });
  }

  public async deleteHashTag(id: number) {
    return await this.hashTagRepository.delete({ id });
  }

  public async softDeleteHashTag(id: number) {
    return await this.hashTagRepository.softDelete({ id });
  }

  public async getAllHashTag() {
    return await this.hashTagRepository.find();
  }
}
