"use strict";

const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const API = "https://open.er-api.com/v6/latest/ETB";
const loadStatus = document.getElementById("status");
const convertForm = document.getElementById("convert-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const result = document.getElementById("result");
const addToWatchList = document.getElementById("add-to-watchlist");
const watchListUl = document.getElementById("watchlist");

const KEY = "birrwatch";

const loadRates = async () => {
  loadStatus.textContent = "Loading rates...";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP: " + res.status);
    const data = await res.json();
    state.rates = data.rates;
    loadStatus.textContent = "";
  } catch {
    loadStatus.textContent = "Could not load rates.";
  }
};

const render = () => {
  const codes = Object.keys(state.rates);
  fromCurrency.innerHTML = codes
    .map((code) => `<option>${code}</option>`)
    .join("");
  fromCurrency.value = state.currency;

  renderWatchlist();
};

convertForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = Number(amountInput.value);
  if (!amount || amount <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }
  if (amount > 1e200) {
    result.textContent = "Number too large.";
    return;
  }

  state.currency = fromCurrency.value;
  const rate = state.rates[state.currency];

  const out = formatLargeNumber(amount / rate, 1e15);
  const formattedAmount = formatLargeNumber(amount);
  result.textContent = `${formattedAmount} ${state.currency} = ${out} ETB`;
});

const formatLargeNumber = (number, threshold = 1e12) => {
  if (number > threshold) {
    return number.toExponential(4);
  }
  return number.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

addToWatchList.addEventListener("click", () => {
  const currency = fromCurrency.value;
  if (state.watchlist.includes(currency)) return;
  state.watchlist.push(currency);

  save();
  renderWatchlist();
});

const renderWatchlist = () => {
  if (state.watchlist.length === 0) {
    watchListUl.innerHTML = "<li>No currencies yet</li>";
    return;
  }
  watchListUl.innerHTML = state.watchlist
    .map((currency) => {
      const rate = 1 / state.rates[currency];
      const formattedRate = rate.toLocaleString([], {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      return `<li data-c="${currency}">1 ${currency} = ${formattedRate} ETB <button class="remove">x</button></li>`;
    })
    .join("");
};

watchListUl.addEventListener("click", (e) => {
  if (!e.target.matches(".remove")) return;
  const c = e.target.closest("li").dataset.c;
  state.watchlist = state.watchlist.filter((x) => x !== c);
  save();
  renderWatchlist();
});

const save = () => {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      rates: state.rates,
      watchlist: state.watchlist,
      currency: state.currency,
    }),
  );
};

const load = () => {
  const saved = localStorage.getItem(KEY);
  if (saved) Object.assign(state, JSON.parse(saved));
  console.log(JSON.parse(saved));
};

const init = async () => {
  load();
  await loadRates();
  render();
};

init();
