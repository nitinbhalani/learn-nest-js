import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { paginationDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Paginated } from './paginater.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  public async PaginateQuery<D extends ObjectLiteral>(
    paginationDto: paginationDto,
    repository: Repository<D>,
    where?: FindOptionsWhere<D>,
  ): Promise<Paginated<D>> {
    const findOption: FindManyOptions<D> = {
      skip: (paginationDto.page - 1) * (paginationDto.limit || 10),
      take: paginationDto.limit,
    };
    if (where) {
      findOption.where = where;
    }
    const result = await repository.find(findOption);
    const totalCount = await repository.count();
    const totalPages = Math.ceil(totalCount / (paginationDto.limit || 10));
    const currentPage = paginationDto.page;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;
    const baseUrl = this.request.protocol + '://' + this.request.host + '/';
    const newUrl = new URL(this.request.url, baseUrl);
    const response: Paginated<D> = {
      data: result,
      meta: {
        itemPerPage: paginationDto.limit || 10,
        totalItems: totalCount,
        currentPage: currentPage,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?page=${1}&limit=${paginationDto.limit || 10}`,
        last: `${newUrl.origin}${newUrl.pathname}?page=${totalPages}&limit=${paginationDto.limit || 10}`,
        current: `${newUrl.origin}${newUrl.pathname}?page=${currentPage}&limit=${paginationDto.limit || 10}`,
        previous: `${newUrl.origin}${newUrl.pathname}?page=${previousPage}&limit=${paginationDto.limit || 10}`,
        next: `${newUrl.origin}${newUrl.pathname}?page=${nextPage}&limit=${paginationDto.limit || 10}`,
      },
    };
    return response;
  }
}
