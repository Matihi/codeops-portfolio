"use strict";

const display = document.getElementById("display");

const fetchData = async () => {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    console.log(String(res.status));
    console.log(String(res.ok));
    if (!res.ok) {
      throw new Error("HTTP: " + res.status);
    }

    const exchangeRate = await res.json();
    console.log(exchangeRate);
  } catch (err) {
    console.error(err);
    display.textContent = "Catch block works: " + err.message;
  }
};

fetchData();
