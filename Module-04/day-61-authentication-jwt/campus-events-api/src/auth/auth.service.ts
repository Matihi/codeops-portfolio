import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService, User } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

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

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);

    const passwordMatches = user
      ? await argon2.verify(user.passwordHash, dto.password)
      : false;

    if (!user || !passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user);
  }

  private async issueTokens(user: User) {
    const accessPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(accessPayload, {
        secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
        algorithm: 'HS256',
      }),
      this.jwt.signAsync(
        { sub: user.id },
        {
          secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
          algorithm: 'HS256',
        },
      ),
    ]);

    await this.users.setRefreshHash(user.id, await argon2.hash(refreshToken));

    return { accessToken, refreshToken };
  }
}
