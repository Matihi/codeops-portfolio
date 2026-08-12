"use strict";

import orders from "./orders.js";
import format, { withVat, VAT, total } from "./pricing.js";

const ordersWithTotal = orders.map((order) => ({
  ...order,
  total: total(order),
}));

// console.log(ordersWithTotal);

const filteredOrders = ordersWithTotal.filter((order) => order.total > 500);

// console.log(filteredOrders);

const formattedOrders = filteredOrders.map((order) => ({
  name: order.name,
  total: format(order.total),
}));

// console.log(formattedOrders);

const grandTotal = filteredOrders.reduce((sum, { total }) => (sum += total), 0);
// console.log(grandTotal);

function display() {
  for (const item of formattedOrders) {
    console.log(`${item.name}: ${item.total}`);
  }
  console.log(`Total:${grandTotal.toFixed(2)} ETB`);
}

display();
