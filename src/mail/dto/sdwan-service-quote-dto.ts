import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class SDWANServiceQuoteDto {
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
  readonly industry: string;

  @ApiProperty()
  readonly primary?: string;

  @ApiProperty()
  readonly secondary?: string;

  @ApiProperty()
  readonly sitetype?: string;

  @ApiProperty()
  readonly noofsites?: string;

  @ApiProperty()
  @IsOptional()
  readonly services?: string[];
}
