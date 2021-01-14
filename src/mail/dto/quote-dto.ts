import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class QuoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiProperty()
  readonly status: boolean;

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
  readonly company_size: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly website_url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly company_name: string;

  @ApiProperty()
  @IsNumber()
  readonly monthly_cost: number;
}
