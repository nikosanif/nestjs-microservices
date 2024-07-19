import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { NonEmptyArray } from '@nmsvc/sdk/types';

import { AuthClientGrantEnum } from '../../domain';

export class CreateOAuthClientRequestDto {
  @MaxLength(300)
  @MinLength(1)
  @IsString()
  @ApiProperty({
    example: 'Client name',
    description: 'Client name',
    required: true,
  })
  readonly name!: string;

  @MaxLength(300)
  @MinLength(1)
  @IsString()
  @ApiProperty({
    example: 'client-id',
    description: 'Client ID',
    required: true,
  })
  readonly clientId!: string;

  @IsEnum(AuthClientGrantEnum, { each: true })
  @ArrayMinSize(1)
  @IsArray()
  @ApiProperty({
    example: ['password'],
    description: 'List of allowed grants',
    required: true,
  })
  readonly grants!: NonEmptyArray<AuthClientGrantEnum>;

  @IsUrl(
    {
      // Ref: https://github.com/validatorjs/validator.js
      require_protocol: true,
      protocols: ['http', 'https'],
      require_tld: false,
      allow_query_components: false,
      allow_fragments: false,
    },
    { each: true }
  )
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['http://localhost:3000'],
    description: 'List of allowed redirect URIs',
    required: false,
  })
  readonly redirectUris?: string[];

  @Min(1)
  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 60 * 60 * 24 * 1, // 1 day
    description: 'Access token lifetime in seconds',
    required: false,
  })
  readonly accessTokenLifetime?: number;

  @Min(1)
  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 60 * 60 * 24 * 7, // 7 days
    description: 'Refresh token lifetime in seconds',
    required: false,
  })
  readonly refreshTokenLifetime?: number;

  constructor(partial: Partial<CreateOAuthClientRequestDto>) {
    Object.assign(this, partial);
  }
}
