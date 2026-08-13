"use strict";

const div2 = document.querySelector(".div2");

const cities = ["Addis Ababa", "Adama", "Gondor"];

const cityList = document.createElement("ul");

cities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.append(li);
});

div2.append(cityList);
