import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PaginatedQueryRequestDto } from '@nmsvc/sdk/types';

export class FindUsersQueryRequestDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Filter users by email',
    required: false,
  })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Filter users by username',
    required: false,
  })
  readonly username?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(['role'], { each: true })
  @Transform(({ value }) => value.split(','))
  @ApiProperty({
    description: 'Populate related entities',
    required: false,
    type: String,
  })
  readonly populate?: Array<'role'>;
}
