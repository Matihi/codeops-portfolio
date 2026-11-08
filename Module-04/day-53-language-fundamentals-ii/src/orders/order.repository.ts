import type { Order } from "./order.types.js";

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
}

export const inMemoryOrders: Map<number, Order> = new Map([
  [
    10,
    {
      id: 10,
      customerName: "Abebe",
      area: "Bole",
      status: "PENDING",
      dishes: [{ name: "Doro wot", price: 15000 }],
      total: 15000,
    },
  ],
  [
    11,
    {
      id: 11,
      customerName: "Kebede",
      area: "Kazanchis",
      status: "PENDING",
      dishes: [
        { name: "Doro wot", price: 15000 },
        { name: "Shiro", price: 10000 },
      ],
      total: 25000,
    },
  ],
  [
    12,
    {
      id: 12,
      customerName: "Almaz",
      area: "Piassa",
      status: "DELIVERED",
      dishes: [
        { name: "Tibs", price: 14000 },
        { name: "Beyaynet", price: 13000 },
      ],
      total: 27000,
    },
  ],
]);

export class OrderRepo implements OrderRepository {
  constructor(private readonly orders: Map<number, Order>) {}

  public byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  public all(): Order[] {
    const orderArr = [...this.orders.values()];
    return orderArr;
  }
}
