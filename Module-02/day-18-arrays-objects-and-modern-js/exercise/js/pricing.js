"use strict";

export const VAT = 0.15;
export const withVat = (price) => price * (1 + VAT);

export const total = ({ items }) =>
  items.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

export default function format(item) {
  return `${item.toFixed(2)} ETB`;
}
