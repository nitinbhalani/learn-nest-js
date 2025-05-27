import { IntersectionType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { paginationDto } from 'src/comman/pagination/dto/pagination-query.dto';

class getTweetBasedDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetTweetQueryDto extends IntersectionType(
  getTweetBasedDto,
  paginationDto,
) {}
