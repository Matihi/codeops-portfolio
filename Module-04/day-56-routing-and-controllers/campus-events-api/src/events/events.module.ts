import { Module } from '@nestjs/common';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';
import { EVENT_REPOSITORY } from './events.token.js';
import { InMemoryEventsRepository } from './events.repository.js';
import { SessionsModule } from '../sessions/sessions.module.js';

@Module({
  imports: [SessionsModule],
  controllers: [EventsController],
  providers: [
    EventsService,
    { provide: EVENT_REPOSITORY, useClass: InMemoryEventsRepository },
  ],
})
export class EventsModule {}
