import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../common.types.js';
import { ROLES_KEY } from '../decorators/roles.decorators.js';
import { RequestWithUser } from '../common.interfaces.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) {
      return true;
    }
    const user = context.switchToHttp().getRequest<RequestWithUser>().user;
    return required.some((role) => user?.roles?.includes(role));
  }
}
