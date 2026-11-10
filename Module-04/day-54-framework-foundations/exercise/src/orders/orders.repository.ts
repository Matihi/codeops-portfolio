import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { Order, OrderRepository } from './orders.interfaces.js';
import { SEED } from './orders.seed.js';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<number, Order> = new Map<number, Order>(
    SEED.map((order) => [order.id, order]),
  );

  async findAll(): Promise<Order[]> {
    return [...this.orders.values()];
  }

  async findById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const idNum = Math.max(0, ...this.orders.keys()) + 1;
    const order: Order = {
      id: idNum,
      customerName: data.customerName,
      area: data.area,
      status: 'PENDING',
      phone: data.phone,
      totalSantim: data.totalSantim,
    };
    this.orders.set(idNum, order);
    return order;
  }
}
