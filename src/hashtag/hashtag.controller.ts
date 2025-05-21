import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { HashTagDto } from './dto/hashtag.dto';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashTagService: HashtagService) {}
  @Post()
  public async createHashTag(@Body() Hashtag: HashTagDto) {
    return await this.hashTagService.createHashTag(Hashtag);
  }

  @Delete(':id')
  public async deleteHashTag(@Param('id', ParseIntPipe) id: number) {
    return await this.hashTagService.deleteHashTag(id);
  }

  @Delete('soft/:id')
  public async softDeleteHashTag(@Param('id', ParseIntPipe) id: number) {
    return await this.hashTagService.softDeleteHashTag(id);
  }

  @Get()
  public async getAllHashTag() {
    return await this.hashTagService.getAllHashTag();
  }
}
