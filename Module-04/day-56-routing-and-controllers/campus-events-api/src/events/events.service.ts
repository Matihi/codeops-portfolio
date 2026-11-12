import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY } from './events.token.js';
import type { Event, EventRepository } from './events.interfaces.js';
import { EventNotFoundError } from './events.errors.js';
import { CreateEventDto } from './dto/create-event.dto.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly repository: EventRepository,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Event> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new EventNotFoundError(id);
    }
    return event;
  }

  async findUpcoming(): Promise<Event[]> {
    return this.repository.findUpcoming();
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const idNum =
      Math.max(
        0,
        ...(await this.repository.findAll())
          .map((event) => event.id)
          .map((id) => Number(id?.slice(4))),
      ) + 1;
    const id = `evt-${idNum}`;
    return this.repository.save({
      id,
      ...dto,
      eventDate: new Date(dto.eventDate),
    });
  }
}
