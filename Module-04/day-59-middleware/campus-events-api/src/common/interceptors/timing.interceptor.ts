import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    console.log('Request started: ', request.url);

    return next.handle().pipe(
      tap(() => {
        console.log(`Request completed in ${Date.now() - start}ms`);
      }),
    );
  }
}
