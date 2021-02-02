import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class LeadsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly website: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly company: string;
}
