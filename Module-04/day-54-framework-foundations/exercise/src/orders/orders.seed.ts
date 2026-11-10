import { Order } from './orders.interfaces.js';
export const SEED: Order[] = [
  {
    id: 1,
    customerName: 'Abebe',
    area: 'Bole',
    status: 'PENDING',
    totalSantim: 10_000,
  },
  {
    id: 2,
    customerName: 'Kebede',
    area: 'Megenagna',
    status: 'PENDING',
    totalSantim: 15_000,
  },
];
