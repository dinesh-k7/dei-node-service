import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class WdQuoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

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
  readonly position: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly industry?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly companyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly targetAudience: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly aboutCompany: string;

  @ApiProperty()
  @IsOptional()
  readonly comment?: string;

  @ApiProperty()
  @IsOptional()
  readonly keywords?: string[];

  @ApiProperty()
  @IsOptional()
  readonly colorPicker?: string;

  @ApiProperty()
  @IsOptional()
  readonly isContent?: boolean;

  @ApiProperty()
  @IsOptional()
  isSelling?: boolean;

  @ApiProperty()
  @IsOptional()
  isSEO?: boolean;
}
