import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { Order } from './orders.interfaces.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderNotFoundError } from './orders.errors.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    try {
      return await this.ordersService.findById(id);
    } catch (error) {
      if (error instanceof OrderNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  @HttpCode(201)
  async create(@Body() order: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(order);
  }
}
