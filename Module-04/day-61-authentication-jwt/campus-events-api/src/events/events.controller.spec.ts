import { Test, TestingModule } from '@nestjs/testing';
import { EventsV1Controller } from './events.controller.js';

describe('EventsController', () => {
  let controller: EventsV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsV1Controller],
    }).compile();

    controller = module.get<EventsV1Controller>(EventsV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
