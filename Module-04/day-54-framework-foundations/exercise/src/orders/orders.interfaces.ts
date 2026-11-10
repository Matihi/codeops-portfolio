import { Area, OrderStatus, Dish } from './orders.types.js';

export interface Order {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  phone?: string;
  totalSantim: number;
}
