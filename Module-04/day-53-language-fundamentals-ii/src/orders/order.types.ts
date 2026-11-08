const area = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;

export type Area = (typeof area)[number];

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED"
  | "NOT_COMPLETED";

export type Dish = {
  name: string;
  price: number;
};

export type Order = {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  total: number;
};
