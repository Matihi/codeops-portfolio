"use strict";

function applyToAll(list, func) {
  const pricesAfterVat = [];
  for (const item of list) {
    pricesAfterVat.push(func(item));
  }
  console.log(pricesAfterVat);
}

applyToAll([100, 45, 356], (price) => price * 1.15);
