export class OrderNotFoundError extends Error {
  constructor(public readonly id: number) {
    super(`Order with id ${id} was not found.`);
    this.name = 'OrderNotFoundError';
  }
}
