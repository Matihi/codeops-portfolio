import { OrderNotFoundError } from "./order.errors.js";
import type { OrderRepository } from "./order.repository.js";
import type { Area, Order } from "./order.types.js";

export class OrderService {
  constructor(private readonly repo: OrderRepository) {}

  find(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 5000,
      Piassa: 6000,
      Megenagna: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    const orders = this.repo.all();
    if (orders.length === 0) {
      return [];
    }
    const orderKeyValues = orders.map((order) => order[key]);
    return orderKeyValues;
  }
}
