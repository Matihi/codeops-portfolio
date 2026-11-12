import { Injectable, Inject } from '@nestjs/common';
import { ORDER_REPOSITORY } from './orders.tokens.js';
import { OrderNotFoundError } from './orders.errors.js';
import type { OrderRepository, Order } from './orders.interfaces.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository,
  ) {}

  async findAll(area?: string): Promise<Order[]> {
    return this.repo.findAll(area);
  }

  async findById(id: number): Promise<Order> {
    const order = await this.repo.findById(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
  }

  async create(orderDto: CreateOrderDto): Promise<Order> {
    return this.repo.create(orderDto);
  }

  async updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const status = updateOrderStatusDto.status;
    const result = await this.repo.updateStatus(id, status);
    if (!result) {
      throw new OrderNotFoundError(id);
    }
  }
}
