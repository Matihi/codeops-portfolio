import {
  IsString,
  IsInt,
  IsIn,
  Equals,
  Min,
  IsOptional,
  Matches,
} from 'class-validator';
import { AREAS } from '../orders.types.js';
import type { Area } from '../orders.types.js';

export class CreateOrderDto {
  @IsString()
  customerName!: string;

  @IsIn(AREAS)
  area!: Area;

  @Equals('PENDING')
  status!: 'PENDING';

  @IsInt()
  restaurantId!: number;

  @IsInt()
  @Min(1)
  totalSantim!: number;

  @IsOptional()
  @Matches(/^(?:\+251|0)9\d{8}$/, {
    message: 'phone must be a valid TeleBirr number',
  })
  phone?: string;
}
