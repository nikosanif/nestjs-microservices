import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserRequestDto {
  @MaxLength(300)
  @MinLength(5)
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'john@doe.com',
    description: 'Unique email',
    required: false,
  })
  readonly email?: string;

  @MaxLength(300)
  @MinLength(1)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'First name should contain only letters and numbers',
  })
  @IsOptional()
  @ApiProperty({
    example: 'John',
    description: 'First name',
    required: false,
  })
  readonly firstName?: string;

  @MaxLength(300)
  @MinLength(1)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Last name should contain only letters and numbers',
  })
  @IsOptional()
  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
    required: false,
  })
  readonly lastName?: string;
}
