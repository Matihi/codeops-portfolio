import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller.js';
import { SessionsService } from './sessions.service.js';
import { SESSION_REPOSITORY } from './sessions.token.js';
import { InMemorySessionsRepository } from './sessions.repository.js';

@Module({
  controllers: [SessionsController],
  providers: [
    SessionsService,
    {
      provide: SESSION_REPOSITORY,
      useClass: InMemorySessionsRepository,
    },
  ],
})
export class SessionsModule {}
