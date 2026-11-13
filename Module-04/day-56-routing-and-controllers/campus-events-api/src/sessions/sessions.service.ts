import { Inject, Injectable } from '@nestjs/common';
import { SESSION_REPOSITORY } from './sessions.token.js';
import type { Session, SessionRepository } from './sessions.interfaces.js';
import { SessionNotFoundError } from './sessions.errors.js';

@Injectable()
export class SessionsService {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly repository: SessionRepository,
  ) {}

  async findAll(): Promise<Session[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Session> {
    const session = await this.repository.findById(id);
    if (!session) {
      throw new SessionNotFoundError(id);
    }
    return session;
  }
}
