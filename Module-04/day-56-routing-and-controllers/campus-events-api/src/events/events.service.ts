import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY } from './events.token.js';
import type { Event, EventRepository, Page } from './events.interfaces.js';
import { EventNotFoundError } from './events.errors.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly repository: EventRepository,
  ) {}

  async findAll(query: FindEventsQueryDto): Promise<Page<Event>> {
    let rows = await this.repository.findAll();
    if (query.category) {
      rows = rows.filter((row) => row.category === query.category);
    }
    if (query.location) {
      rows = rows.filter((row) => row.location === query.location);
    }
    if (query.isPublished !== undefined) {
      console.log(query.isPublished);
      rows = rows.filter((row) => row.isPublished === query.isPublished);
    }

    let rowsWithEventDateString = rows.map((row) => ({
      ...row,
      eventDate: row.eventDate.toISOString(),
    }));

    if (query.order === 'asc') {
      rows = [...rowsWithEventDateString]
        .sort((a, b) => a[query.sortBy].localeCompare(b[query.sortBy]))
        .map((row) => ({ ...row, eventDate: new Date(row.eventDate) }));
    } else if (query.order === 'desc') {
      rows = [...rowsWithEventDateString]
        .sort((a, b) => -a[query.sortBy].localeCompare(b[query.sortBy]))
        .map((row) => ({ ...row, eventDate: new Date(row.eventDate) }));
    }
    const total = rows.length;
    const offset = (query.page - 1) * query.limit;
    const start = offset;
    const end = start + query.limit;
    const items = rows.slice(start, end);
    const totalPages = Math.ceil(total / query.limit);
    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
      totalPages,
    };
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
