"use strict";

const main = document.getElementById("main");
const heading = document.getElementById("heading");
const countryForm = document.getElementById("country-form");
const country = document.getElementById("country");
const facts = document.getElementById("facts");

const render = (out, name, capital, population, region, currencies, flag) => {
  out.textContent = "";
  const factsUl = document.createElement("ul");
  factsUl.classList.add("facts-ul");
  const nameP = document.createElement("h2");
  const capitalLi = document.createElement("li");
  const populationLi = document.createElement("li");
  const regionLi = document.createElement("li");
  const currenciesLi = document.createElement("li");
  const flagLi = document.createElement("li");

  name = name.charAt(0).toUpperCase() + name.slice(1);

  nameP.textContent = `Facts about ${name}`;
  capitalLi.textContent = capital ? `Capital:${capital}` : "Capital: -";
  populationLi.textContent = population
    ? `Population: ${population}`
    : "Population: -";
  regionLi.textContent = region ? `Region: ${region}` : "Region: -";
  if (!currencies) {
    currenciesLi.textContent = "Currencies: -";
  } else {
    const currenciesUl = document.createElement("ul");
    currenciesUl.classList.add("currencies-ul");
    currenciesLi.textContent = "Currencies:";
    currencies.forEach((currency) => {
      const li = document.createElement("li");
      li.textContent = `${currency.name} (${currency.code}/${currency.symbol})`;
      currenciesUl.append(li);
    });
    currenciesLi.append(currenciesUl);
  }

  const flagImg = document.createElement("img");
  if (!flag) {
    flagLi.textContent = "-";
  } else {
    flagImg.src = flag;
    flagImg.alt = `Flag of ${name}`;
    flagLi.textContent = "Flag:";
    flagLi.append(flagImg);
  }

  factsUl.append(capitalLi, populationLi, regionLi, currenciesLi, flagLi);
  out.append(nameP, factsUl);
};

const checkName = (country, name) => {
  const countryName = country.name.toLowerCase();

  if (name.length < 3) {
    return false;
  }

  if (countryName === name) {
    return true;
  }

  if (countryName.startsWith(name)) {
    return true;
  }

  return false;
};

const showCountry = async (name) => {
  facts.textContent = "Loading...";
  try {
    const res = await fetch(`https://countries.dev/name/${name}`, {
      method: "GET",
    });
    if (!res.ok) throw new Error(`HTTP: ${res.status} (Not Found)`);
    const countries = await res.json();
    const theCountry = countries.find((country) => checkName(country, name));

    if (!theCountry) {
      facts.textContent = "Country not found.";
      return;
    }

    const countryName = theCountry.name;
    const capital = theCountry.capital;
    const population = theCountry.population.toLocaleString();
    const region = theCountry.region;
    const currencies = theCountry.currencies;
    const flag = theCountry.flags.png;
    render(facts, countryName, capital, population, region, currencies, flag);
  } catch (err) {
    facts.textContent = "Country not found.";
    console.log(err.message);
  }
};

const getFormData = () => {
  countryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let countryName = country.value.trim();
    if (countryName === "") return;
    countryName = countryName.toLowerCase();

    showCountry(countryName);
  });
};

getFormData();

showCountry("ethiopia");
