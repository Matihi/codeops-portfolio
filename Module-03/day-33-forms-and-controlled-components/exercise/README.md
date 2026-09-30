#### Reason for why cart is in a store.

- cart changes frequently, had it been through a context provider, many unnecessary re-renders would occur.

#### Reason for why auth session stays in context.

- auth session changes rarely, so the cost of re-renders is small.
