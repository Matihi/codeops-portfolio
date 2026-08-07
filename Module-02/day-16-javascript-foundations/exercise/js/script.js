"use strict";

let bill = Number("100");
let partySize = 3;

let tip = bill > 300 ? bill * 0.1 : bill * 0.05;

let totalPayment = bill + tip;
let perPersonPayment = totalPayment / partySize;

console.log(
  `The total payment is ETB ${totalPayment} and the per-person payment is ETB ${perPersonPayment}`,
);

let method = "telebirr";
let fee = 0;

switch (method) {
  case "telebirr":
    fee = totalPayment * 0.005;
    break;
  case "cbebirr":
    fee = totalPayment * 0.01;
    break;
  default:
    fee = totalPayment * 0.02;
}

totalPayment = totalPayment + fee;

console.log(
  `The total payment with ${method} service fee of ETB ${fee} is ETB ${totalPayment}`,
);
