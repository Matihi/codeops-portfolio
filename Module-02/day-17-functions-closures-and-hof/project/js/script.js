"use strict";

function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
  let loyaltyPoints = 0;

  return {
    earn(amount) {
      loyaltyPoints += earnRule(amount);
    },
    redeem(points) {
      loyaltyPoints = Math.max(0, loyaltyPoints - points);
    },
    balance() {
      return loyaltyPoints;
    },
  };
}

const standardCard = createLoyalty();

console.log(standardCard.balance());
standardCard.earn(100);
console.log(standardCard.balance());
standardCard.redeem(2);
console.log(standardCard.balance());
standardCard.redeem(23);
console.log(standardCard.balance());

const plusCard = createLoyalty((amount) => Math.floor(amount / 10) * 2);

console.log(plusCard.balance());
plusCard.earn(150);
console.log(plusCard.balance());
plusCard.redeem(4);
console.log(plusCard.balance());
plusCard.redeem(1000);
console.log(plusCard.balance());
