"use strict";

const subtotal = (...prices) => {
  return prices.reduce((total, current) => (total += current), 0);
};

// console.log(`subtotal is ${subtotal(100, 200, 300, 400)}`);

const discountBy = (rate = 0.1) => {
  return (price) => {
    return price - price * rate;
  };
};

// const discountPrice = discountBy(0.1);
// const newPrice = discountPrice(subtotal(100, 200, 300, 400));
// console.log(newPrice);

const withVat = (priceBeforeVat) => priceBeforeVat * 1.15;

// const priceAfterVat = withVat(newPrice);
// console.log(`price after 15% vat is added is ${priceAfterVat}`);

const toETB = (price) => `${price.toFixed(2)} ETB`;

// const formattedPrice = toETB(priceAfterVat);
// console.log(formattedPrice);

function makeReceiptMaker() {
  let orderNo = 0;
  const memberOff = discountBy();

  return function (...items) {
    ++orderNo;
    const grossPrice = subtotal(...items);
    const netPrice = withVat(memberOff(grossPrice));
    return `#${orderNo}: ${toETB(netPrice)}`;
  };
}

const receipt = makeReceiptMaker();
console.log(receipt(220, 180, 120));
console.log(receipt(140, 60));
console.log(receipt(100, 200, 300, 400));
console.log(receipt(100, 200, 300));
