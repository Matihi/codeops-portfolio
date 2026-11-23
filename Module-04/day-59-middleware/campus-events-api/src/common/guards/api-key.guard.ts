import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestWithUser } from '../common.interfaces.js';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const key = req.headers['x-api-key'];
    if (!key) {
      throw new UnauthorizedException('x-api-key is required');
    }
    const apiKeys = this.config.get('API_KEY')?.split(',') ?? [];
    if (!apiKeys.includes(key)) {
      throw new ForbiddenException('Invalid API key');
    }
    req.user = req.user ?? {};
    if (key === this.config.get('ADMIN_KEY')) {
      req.user['roles'] = ['admin'];
    }
    return true;
  }
}
