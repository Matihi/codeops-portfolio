import {
  Body,
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import type { Event } from './events.interfaces.js';
import { EventNotFoundError } from './events.errors.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';
import { SessionsService } from '../sessions/sessions.service.js';
import { Session } from '../sessions/sessions.interfaces.js';
import { SessionForEventNotFoundError } from '../sessions/sessions.errors.js';
import type { Page } from '../common/common.interfaces.js';
import { ApiKeyGuard } from '../common/guards/api-key.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorators.js';
import { UseInterceptors } from '@nestjs/common';
import { TimingInterceptor } from '../common/interceptors/timing.interceptor.js';

@Controller({ path: 'events', version: '1' })
@UseGuards(ApiKeyGuard, RolesGuard)
@UseInterceptors(TimingInterceptor)
export class EventsV1Controller {
  constructor(
    private readonly eventsService: EventsService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60')
  async findAll(@Query() query: FindEventsQueryDto): Promise<Page<Event>> {
    return this.eventsService.findAll(query);
  }

  @Get('upcoming')
  async findUpcoming(): Promise<Page<Event>> {
    return this.eventsService.findUpcoming();
  }

  @Get(':id')
  @Header('Cache-Control', 'public, max-age=60')
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
  @Header('Cache-Control', 'public, max-age=60')
  async findSessions(@Param('id') id: string): Promise<Page<Session>> {
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
  @Header('Cache-Control', 'public, max-age=60')
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
  @Roles('admin')
  @Header('Cache-Control', 'no-store')
  async create(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(dto);
  }
}
