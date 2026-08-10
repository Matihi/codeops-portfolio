"use strict";

function makeCounter() {
  let counter = 0;
  return () => {
    return ++counter;
  };
}

const count = makeCounter();

console.log(count());
console.log(count());
console.log(count());
console.log(count());

/**
 * counter stays private because it is function scoped
 */
