import { Order } from './orders.interfaces.js';
export const SEED: Order[] = [
  {
    id: 1,
    customerName: 'Abebe',
    area: 'Bole',
    status: 'PENDING',
    restaurantId: 1,
    totalSantim: 10_000,
  },
  {
    id: 2,
    customerName: 'Kebede',
    area: 'Megenagna',
    status: 'PENDING',
    restaurantId: 3,
    totalSantim: 15_000,
  },
];
