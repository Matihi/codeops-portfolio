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
import { SessionsService } from '../sessions/sessions.service.js';
import { Session } from '../sessions/sessions.interfaces.js';
import { SessionForEventNotFoundError } from '../sessions/sessions.errors.js';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly sessionsService: SessionsService,
  ) {}

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

  @Get(':id/sessions')
  async findSessions(@Param('id') id: string): Promise<Session[]> {
    try {
      await this.eventsService.findById(id);
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
    return this.sessionsService.findAllByEventId(id);
  }

  @Get(':eventId/sessions/:sessionId')
  async findSessionForEvent(
    @Param('eventId') eventId: string,
    @Param('sessionId') sessionId: string,
  ): Promise<Session> {
    try {
      await this.eventsService.findById(eventId);
      return await this.sessionsService.findOneByEventId(sessionId, eventId);
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof SessionForEventNotFoundError) {
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
