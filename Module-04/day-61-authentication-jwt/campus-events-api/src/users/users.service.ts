import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  roles: string[];
  refreshHash: string | null;
}

@Injectable()
export class UsersService {}
