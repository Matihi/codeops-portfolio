import { Controller, Body, Post, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshDto } from './dto/refresh.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  getMe(
    @Req()
    req: {
      user: {
        id: number;
        email: string;
        roles: string[];
      };
    },
  ) {
    return req.user;
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('logout')
  logout(
    @Req()
    req: {
      user: {
        id: number;
        email: string;
        roles: string[];
      };
    },
  ) {
    return this.authService.logout(req.user.id);
  }
}
