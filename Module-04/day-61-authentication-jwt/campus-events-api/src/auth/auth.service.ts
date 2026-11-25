import { Injectable, ConflictException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.users.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already registerd');
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = await this.users.create({ email: dto.email, passwordHash });

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }
}
