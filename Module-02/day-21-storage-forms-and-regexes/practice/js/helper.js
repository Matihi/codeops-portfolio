"use strict";

const save = (key, array) => {
  const arrayString = JSON.stringify(array);
  localStorage.setItem(key, arrayString);
};

const load = (key) => {
  try {
    const data = localStorage.getItem(key);

    if (data === null) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

let array = [
  { name: "Apple", price: 50 },
  { name: "Banana", price: 60 },
];

save("items", array);

const loadedItems = load("items");

console.log(loadedItems);
