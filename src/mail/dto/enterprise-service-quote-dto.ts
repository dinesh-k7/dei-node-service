import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class EnterpriseServiceQuoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

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
  readonly companySize?: string;

  @ApiProperty()
  @IsString()
  readonly position?: string;

  @ApiProperty()
  @IsString()
  readonly fromPage?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly websiteUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly companyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly addressline1: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly suite: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly industry: string;
}
