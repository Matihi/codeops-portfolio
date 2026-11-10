export const AREAS = ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'] as const;

export type Area = (typeof AREAS)[number];

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
