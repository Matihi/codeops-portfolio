export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  eventDate: Date;
  category: string;
  isPublished: boolean;
}

export interface EventRepository {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | undefined>;
  findUpcoming(): Promise<Event[]>;
  save(event: Event): Promise<Event>;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
