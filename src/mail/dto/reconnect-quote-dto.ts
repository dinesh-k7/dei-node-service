import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class ReconnectQuoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  readonly fromPage?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty()
  @IsOptional()
  readonly beliefs?: string[];

  @ApiProperty()
  @IsOptional()
  readonly additional_beliefs?: string[];
}
