import { Request } from 'express';
export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RequestWithUser extends Request {
  user?: Record<string, string[]>;
}
