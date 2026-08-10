"use strict";

function vat(amount, rate = 0.15) {
  return amount * rate;
}

console.log(vat(100));

const myVat = (amount, rate = 0.15) => amount * rate;

console.log(myVat(100));
