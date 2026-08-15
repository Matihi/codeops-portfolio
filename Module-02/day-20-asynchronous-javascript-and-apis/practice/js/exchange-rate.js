"use strict";

const exchRate = document.getElementById("exchange-rate");

// The three-step process.

// fetch("https://open.er-api.com/v6/latest/USD")
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error("HTTP: " + res.status);
//     }
//     return res.json();
//   })
//   .then((exchangeRate) => {
//     const usdRate = String(exchangeRate.rates.USD);
//     const etbRate = String(exchangeRate.rates.ETB);
//     const rate = `${usdRate} USD = ${etbRate} ETB`;
//     exchRate.textContent = rate;
//   })
//   .catch((error) => {
//     exchRate.textContent = "Unable to retrieve data";
//   });

const fetchExchangeRate = async () => {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");

  if (!res.ok) {
    throw new Error("HTTP: " + res.status);
  }

  const exchangeRate = await res.json();
  return exchangeRate;
};

const logExchangeRate = async () => {
  try {
    const exchangeRate = await fetchExchangeRate();
    const usdRate = String(exchangeRate.rates.USD);
    const etbRate = String(exchangeRate.rates.ETB);
    const rate = `${usdRate} USD = ${etbRate} ETB`;
    exchRate.textContent = rate;
  } catch {
    exchRate.textContent = "Unable to retrieve data";
  }
};

logExchangeRate();
