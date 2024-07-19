import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { RoleSlugEnum } from '../../domain';

export class CreateUserRequestDto {
  @MaxLength(300)
  @MinLength(1)
  @IsString()
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username',
    required: true,
  })
  readonly username!: string;

  @MaxLength(300)
  @MinLength(5)
  @IsEmail()
  @ApiProperty({
    example: 'john@doe.com',
    description: 'Unique email',
    required: true,
  })
  readonly email!: string;

  @MaxLength(300)
  @MinLength(1)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'First name should contain only letters and numbers',
  })
  @ApiProperty({
    example: 'John',
    description: 'First name',
    required: true,
  })
  readonly firstName!: string;

  @MaxLength(300)
  @MinLength(1)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Last name should contain only letters and numbers',
  })
  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
    required: true,
  })
  readonly lastName!: string;

  @MaxLength(300)
  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
    message: 'Password should contain at least one number and one special character',
  })
  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Password',
    required: true,
  })
  readonly password!: string;

  @IsOptional()
  @IsEnum(RoleSlugEnum)
  @ApiProperty({
    enum: RoleSlugEnum,
    example: RoleSlugEnum.User,
    description: 'Role',
    required: false,
    default: RoleSlugEnum.User,
  })
  readonly roleSlug?: RoleSlugEnum;

  constructor(partial: Partial<CreateUserRequestDto>) {
    Object.assign(this, partial);
  }
}
