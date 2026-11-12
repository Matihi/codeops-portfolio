export const AREAS = ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'] as const;

export type Area = (typeof AREAS)[number];

export const OrderStatuses = [
  'PENDING',
  'PREPARING',
  'ON_THE_WAY',
  'DELIVERED',
  'CANCELLED',
  'NOT_COMPLETED',
];

export type OrderStatus = (typeof OrderStatuses)[number];

export type Dish = {
  name: string;
  price: number;
};
