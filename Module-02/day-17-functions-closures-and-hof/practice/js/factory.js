"use strict";

function discountBy(rate) {
  return (amount) => amount - amount * rate;
}

const memberPrice = discountBy(0.1);
const salePrice = discountBy(0.3);

console.log(`memberPrice: ${memberPrice(1000)}`);
console.log(`salePrice:${salePrice(1000)}`);
