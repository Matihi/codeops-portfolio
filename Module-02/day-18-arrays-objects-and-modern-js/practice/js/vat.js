"use strict";

const prices = [100, 30, 45, 256, 10, 2550, 2221, 999, 879, 76];

const grandTotal = prices
  .map((price) => price * 1.15)
  .filter((price) => price < 1000)
  .reduce((sum, item) => (sum += item), 0);

console.log(grandTotal);
