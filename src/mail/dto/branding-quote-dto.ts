import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

class IIndustry {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  group?: string;
}

export class BrandingQuoteDto {
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
  @IsString()
  readonly position: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly industry?: IIndustry;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly slogan: string;

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
  readonly comment: string;

  @ApiProperty()
  @IsOptional()
  readonly keywords: string;

  @ApiProperty()
  @IsOptional()
  readonly brands: string;

  @ApiProperty()
  @IsOptional()
  readonly colorPicker: string;

  @ApiProperty()
  @IsOptional()
  monthlyCost?: number;
}
