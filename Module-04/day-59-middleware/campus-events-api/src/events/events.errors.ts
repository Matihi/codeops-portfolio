export class EventNotFoundError extends Error {
  constructor(readonly id: string) {
    super(`Event with id ${id} was not found.`);
    this.name = 'EventNotFoundError';
  }
}
