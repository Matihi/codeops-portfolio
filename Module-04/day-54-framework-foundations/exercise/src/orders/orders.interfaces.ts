import { Area, OrderStatus, Dish } from './orders.types.js';

export interface Order {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  totalSantim: number;
}
