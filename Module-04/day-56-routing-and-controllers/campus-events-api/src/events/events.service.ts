import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY } from './events.token.js';
import type { Event, EventRepository } from './events.interfaces.js';
import { EventNotFoundError } from './events.errors.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly repository: EventRepository,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.repository.findAll();
  }

  async findbyId(id: string): Promise<Event> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new EventNotFoundError(id);
    }
    return event;
  }
}
