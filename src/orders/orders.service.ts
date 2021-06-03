import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { createQueryBuilder, Repository } from 'typeorm';
import { OrderItems } from './order-items.entity';
import { Orders } from './orders.entity';
import { IProductDetail } from './interface/product-detail';
import { forkJoin } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private orderRepository: Repository<Orders>,
    @InjectRepository(OrderItems)
    private orderItemsRepository: Repository<OrderItems>,
  ) {}

  /**
   * Function to store order detail
   * @param order : User
   * @param products: IProductDetail
   */
  async createOrder(order: Orders, products: IProductDetail[]): Promise<any> {
    try {
      const orderData = await this.orderRepository.save(order);
      if (orderData && products && products.length) {
        console.log('orderData', orderData);
        const orderItems = [];
        products.forEach((product, index) => {
          const orderItem = {
            orderId: orderData.id,
            itemNumber: index + 1,
            productName: product.name,
            description: product.description,
            price: product.price,
          };

          orderItems.push(this.orderItemsRepository.save(orderItem));
        });
        return await forkJoin(orderItems);
      }
    } catch (error) {
      Logger.log('Error in creating order', JSON.stringify(error));
    }
  }

  /**
   * Function to return orders list
   * @param userId : string
   */
  async getOrders(userId: string): Promise<any> {
    //   console.log('userId', userId);
    try {
      const orders = await this.orderRepository
        .createQueryBuilder('orders')
        .select(
          'orders.id, orders.user_id, orders.status, orders.paypal_order_id, orders.date_time',
        )
        .leftJoinAndSelect('user', 'u', 'u.id = orders.user_id')
        .leftJoinAndSelect('order_items', 'item', 'item.order_id = orders.id')
        .where(`u.id = ${userId}`)
        .getRawMany();
      if (orders && orders.length) {
        const ordersList = orders.map(order => {
          const {
            date_time,
            u_email,
            item_product_name,
            item_description,
            paypal_order_id,
            status,
            item_price,
          } = order;
          const [date] = date_time ? order.date_time.toString().split('T') : [];

          return {
            email: u_email,
            date,
            itemName: item_product_name,
            itemDescription: item_description,
            orderId: paypal_order_id,
            status: status,
            price: item_price,
          };
        });
        return ordersList;
      } else {
        return [];
      }
    } catch (e) {
      Logger.log('Get Orders error', JSON.stringify(e));
      return e;
    }
  }
}
