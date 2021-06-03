import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/order-dto';
import { OrdersService } from './orders.service';
import { decrypt } from '../util';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  /**
   * Function to store order detail based on the provided data
   * @param orderPayload: Order
   */
  @Post()
  @ApiOperation({ summary: 'Store order detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: OrderDto })
  @ApiTags('Orders')
  public async createOrder(@Body() orderPayload: any): Promise<any> {
    const { order, products } = orderPayload;
    const userId = decrypt(order.userId);
    order.userId = +userId;
    return this.orderService.createOrder(order, products);
  }

  /**
   * Function to fetch the order history detail based on userId
   * @param userId: string
   */
  @Get(':userId')
  @ApiOperation({ summary: 'Fetch order detail based on userId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiResponse({ status: HttpStatus.CREATED, description: '201 Created' })
  @ApiTags('Orders')
  @HttpCode(HttpStatus.OK)
  public async getOrders(@Param('userId') userId: string): Promise<any> {
    userId = decrypt(userId);
    return this.orderService.getOrders(userId);
  }
}
