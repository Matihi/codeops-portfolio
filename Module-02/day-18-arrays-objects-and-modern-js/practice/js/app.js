"use strict";

import { VAT, addVat } from "./money.js";

const prices = [100, 30, 45, 256, 10, 2550, 2221, 999, 879, 76];

const pricesWithVat = prices.map((price) => addVat(price));

console.log(pricesWithVat);
