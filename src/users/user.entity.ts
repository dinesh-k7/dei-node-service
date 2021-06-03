import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { Orders } from '../orders/orders.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  created_at: Date;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsOptional()
  phone?: string;
}
