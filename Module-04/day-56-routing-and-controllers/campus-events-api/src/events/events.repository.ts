import { Injectable } from '@nestjs/common';
import { Event, EventRepository } from './events.interfaces.js';
import { EVENTS_SEED } from './events.seed.js';

@Injectable()
export class InMemoryEventsRepository implements EventRepository {
  private readonly events = new Map<string, Event>(
    EVENTS_SEED.map((event) => [event.id, event]),
  );
  async findAll(): Promise<Event[]> {
    return [...this.events.values()];
  }

  async findById(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async findUpcoming(): Promise<Event[]> {
    const now = new Date().getTime();
    const events = [...this.events.values()];
    return events.filter((event) => new Date(event.eventDate).getTime() >= now);
  }

  async save(event: Event): Promise<Event> {
    this.events.set(event.id, event);
    return event;
  }
}
