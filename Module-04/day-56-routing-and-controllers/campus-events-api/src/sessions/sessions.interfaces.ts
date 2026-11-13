export interface Session {
  id: string;
  eventId: string;
  title: string;
  startsAt: Date;
  endsAt: Date;
  room: string;
}

export interface SessionRepository {
  findAll(): Promise<Session[]>;
  findAllByEventId(id: string): Promise<Session[]>;
  findOneByEventId(
    sessionId: string,
    eventId: string,
  ): Promise<Session | undefined>;
  findById(id: string): Promise<Session | undefined>;
}
