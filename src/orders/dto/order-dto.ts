import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly paymentId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty()
  readonly dateTime?: Date;
}
