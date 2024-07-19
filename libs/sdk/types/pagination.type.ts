import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

interface PaginationBase {
  page: number; // current page number [1-x]
  perPage: number; // requested results per page [1-x]
  total: number; // total results [1-x]
}

export class Pagination<T> implements PaginationBase {
  readonly page: number;
  readonly perPage: number;
  readonly total: number;
  readonly data: readonly T[];

  constructor(props: Pagination<T>) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.total = props.total;
    this.data = props.data;
  }
}

export class PaginatedQueryRequestDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: 'Specifies a page number',
    required: false,
    default: 1,
  })
  readonly page?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiProperty({
    example: 20,
    description: 'Specifies a number of records per page',
    required: false,
    default: 20,
  })
  readonly perPage?: number;
}
