const area = ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'] as const;

export type Area = (typeof area)[number];

export type OrderStatus =
  | 'PENDING'
  | 'PREPARING'
  | 'ON_THE_WAY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'NOT_COMPLETED';

export type Dish = {
  name: string;
  price: number;
};
