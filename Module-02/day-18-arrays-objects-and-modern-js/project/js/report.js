"use strict";

export const totalByType = (transactions, type) =>
  transactions
    .filter((transaction) => transaction.type === type)
    .reduce((sum, { amount }) => (sum += amount), 0);

export const format = (transactions) =>
  transactions.map(
    ({ customer, amount }) => `Customer:${customer} Amount:${amount} ETB`,
  );

export const updateTransaction = (transactions, id, newAmount) => {
  const singleTransaction = transactions.filter(
    (transaction) => transaction.id === id,
  );

  return { ...singleTransaction[0], amount: newAmount };
};
