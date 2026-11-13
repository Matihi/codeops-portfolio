import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import type { Event, Page } from './events.interfaces.js';
import { EventNotFoundError } from './events.errors.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query() query: FindEventsQueryDto): Promise<Page<Event>> {
    return this.eventsService.findAll(query);
  }

  @Get('upcoming')
  async findUpcoming(): Promise<Event[]> {
    return this.eventsService.findUpcoming();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Event> {
    try {
      return await this.eventsService.findById(id);
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async create(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(dto);
  }
}
