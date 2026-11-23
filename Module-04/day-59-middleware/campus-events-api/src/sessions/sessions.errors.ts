export class SessionNotFoundError extends Error {
  constructor(readonly id: string) {
    super(`Session with id ${id} was not found`);
    this.name = 'SessionNotFoundError';
  }
}

export class SessionForEventNotFoundError extends Error {
  constructor(
    readonly sessionId: string,
    readonly eventId: string,
  ) {
    super(
      `Session with id ${sessionId} was not found in event with id ${eventId}`,
    );
    this.name = this.constructor.name;
  }
}
