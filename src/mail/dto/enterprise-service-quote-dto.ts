import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

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
  @IsOptional()
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
  readonly addressline?: string;

  @ApiProperty()
  readonly suite?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly industry: string;

  @ApiProperty()
  @IsOptional()
  readonly numberofseats?: string;

  @ApiProperty()
  @IsOptional()
  readonly numberoftvs?: string;

  @ApiProperty()
  @IsOptional()
  readonly services?: string[];
}
