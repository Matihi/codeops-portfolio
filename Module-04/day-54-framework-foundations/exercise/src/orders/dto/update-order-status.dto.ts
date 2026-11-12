import { IsString, IsIn } from 'class-validator';
import { OrderStatuses } from '../orders.types.js';
import type { OrderStatus } from '../orders.types.js';

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(OrderStatuses)
  status: OrderStatus;
}
