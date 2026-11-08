export class OrderNotFoundError extends Error {
  constructor(public readonly id: number) {
    super(`Order with id ${id} was not found.`);
    this.name = "OrderNotFoundError";
  }
}

export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`Payment for ${phone} declined with reason: ${reason}`);
    this.name = "PaymentDeclinedError";
  }
}
