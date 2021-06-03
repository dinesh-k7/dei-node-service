import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';
import { OrderItems } from './order-items.entity';

@Entity()
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'user_id',
    nullable: false,
  })
  @IsNotEmpty()
  userId: string;

  @Column('varchar', {
    name: 'paypal_order_id',
    length: 50,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  paypalOrderId: string;

  @Column('varchar', {
    length: 20,
    name: 'status',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'date_time',
  })
  dateTime: Date;
}
