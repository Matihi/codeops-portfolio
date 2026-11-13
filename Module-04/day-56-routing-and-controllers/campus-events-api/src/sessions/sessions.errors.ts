export class SessionNotFoundError extends Error {
  constructor(readonly id: string) {
    super(`Session with id ${id} was not found`);
    this.name = 'SessionNotFoundError';
  }
}
