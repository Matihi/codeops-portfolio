import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { Order, OrderRepository } from './orders.interfaces.js';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private nextId = 3;

  private readonly orders: Order[] = [
    {
      id: 1,
      customerName: 'Abebe',
      area: 'Bole',
      status: 'PENDING',
      totalSantim: 10_000,
    },
    {
      id: 2,
      customerName: 'Kebede',
      area: 'Megenagna',
      status: 'PENDING',
      totalSantim: 15_000,
    },
  ];

  async findAll(): Promise<Order[]> {
    return [...this.orders];
  }

  async findById(id: number): Promise<Order | undefined> {
    return this.orders.find((order) => order.id === id);
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const order: Order = {
      id: this.nextId++,
      customerName: data.customerName,
      area: data.area,
      status: 'PENDING',
      phone: data.phone,
      totalSantim: data.totalSantim,
    };
    this.orders.push(order);
    return order;
  }
}
