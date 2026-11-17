import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EventsModule } from './events/events.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EventsModule, SessionsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('{*path}');
  }
}
