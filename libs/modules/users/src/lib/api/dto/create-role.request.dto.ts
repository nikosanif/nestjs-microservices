import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import { RoleSlugEnum } from '../../domain';

export class CreateRoleRequestDto {
  @IsEnum(RoleSlugEnum)
  @ApiProperty({
    enum: RoleSlugEnum,
    example: RoleSlugEnum.User,
    description: 'Unique role slug',
    required: true,
  })
  readonly slug!: RoleSlugEnum;

  @MaxLength(300)
  @MinLength(1)
  @IsString()
  @ApiProperty({
    example: 'Administrator',
    description: 'Role name',
    required: true,
  })
  readonly name!: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({
    example: 1,
    description: 'Specifies the role importance',
    required: true,
  })
  readonly weight!: number;

  @MaxLength(300)
  @MinLength(1)
  @IsString()
  @ApiProperty({
    example: 'Administrator role',
    description: 'Role description',
    required: true,
  })
  readonly description!: string;

  constructor(partial: Partial<CreateRoleRequestDto>) {
    Object.assign(this, partial);
  }
}
