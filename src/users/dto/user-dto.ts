import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly phone?: string;

  @ApiProperty()
  readonly created_at?: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
