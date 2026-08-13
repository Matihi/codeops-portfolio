"use strict";

import { transactions } from "./transactions.js";
import { totalByType, format, updateTransaction } from "./report.js";

const formattedReceipt = format(transactions);

const debitTotal = totalByType(transactions, "debit");
console.log(`Totat amount for Debit transactions: ${debitTotal} ETB
    `);

const creditTotal = totalByType(transactions, "credit");
console.log(`Total amount for Credit transactions: ${creditTotal} ETB
    `);

formattedReceipt.forEach((receipt) => console.log(receipt));

const updatedCopy = updateTransaction(transactions, 1, 300);

console.log("\nOriginal transactions");

transactions.forEach((transaction) => console.log(transaction));
console.log("Updated copy of one transaction");

console.log(updatedCopy);
