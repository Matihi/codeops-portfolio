import { CreateOrderDto } from './dto/create-order.dto.js';
import { Area, OrderStatus, Dish } from './orders.types.js';

export interface Order {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  phone?: string;
  totalSantim: number;
}

export interface OrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | undefined>;
  create(data: CreateOrderDto): Promise<Order>;
}
