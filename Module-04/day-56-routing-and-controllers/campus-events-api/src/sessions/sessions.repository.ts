import { Injectable } from '@nestjs/common';
import { Session, SessionRepository } from './sessions.interfaces.js';
import { SESSIONS_SEED } from './sessions.seed.js';

@Injectable()
export class InMemorySessionsRepository implements SessionRepository {
  private readonly sessions = new Map<string, Session>(
    SESSIONS_SEED.map((session) => [session.id, session]),
  );

  async findAll(): Promise<Session[]> {
    return [...this.sessions.values()];
  }

  async findById(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }
}
