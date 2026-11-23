import { IsBoolean, IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 500)
  description: string;

  @IsString()
  @Length(1, 100)
  location: string;

  @IsDateString()
  eventDate: string;

  @IsString()
  @Length(1, 100)
  category: string;

  @IsBoolean()
  isPublished: boolean;
}
