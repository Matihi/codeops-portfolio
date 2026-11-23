import { Module } from '@nestjs/common';
import { EventsV1Controller } from './events.controller.js';
import { EventsService } from './events.service.js';
import { EVENT_REPOSITORY } from './events.token.js';
import { InMemoryEventsRepository } from './events.repository.js';
import { SessionsModule } from '../sessions/sessions.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SessionsModule, ConfigModule],
  controllers: [EventsV1Controller],
  providers: [
    EventsService,
    { provide: EVENT_REPOSITORY, useClass: InMemoryEventsRepository },
  ],
})
export class EventsModule {}
