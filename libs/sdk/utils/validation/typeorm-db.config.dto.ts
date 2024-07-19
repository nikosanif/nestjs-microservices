import { IsDefined, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class TypeOrmDBConfigDto {
  @IsNotEmpty()
  @IsString()
  host!: string;

  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(65535)
  port!: number;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  database!: string;
}
