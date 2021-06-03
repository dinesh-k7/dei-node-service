import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Orders } from './orders.entity';

@Entity()
export class OrderItems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', {
    name: 'order_id',
    nullable: false,
  })
  @IsNotEmpty()
  orderId: number;

  @Column('int', {
    name: 'item_number',
    nullable: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemNumber: number;

  @Column('varchar', {
    length: 200,
    name: 'product_name',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @Column('varchar', {
    length: 250,
    name: 'description',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column('int', {
    name: 'price',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
