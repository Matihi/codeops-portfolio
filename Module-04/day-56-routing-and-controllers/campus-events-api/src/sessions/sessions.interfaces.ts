export interface Session {
  id: string;
  eventId: string;
  title: string;
  startsAt: Date;
  endsAt: Date;
  room: number;
}

export interface SessionRepository {
  findAll(): Promise<Session[]>;
  findById(id: string): Promise<Session | undefined>;
}
