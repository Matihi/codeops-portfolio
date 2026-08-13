"use strict";

let items = [];

const form = document.querySelector("#add-form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

const addRow = (name, price) => {
  items.push({
    id: Date.now(),
    price: price,
  });

  const li = document.createElement("li");
  li.textContent = `${name}: ${price} ETB`;

  items.forEach((item) => {
    li.dataset.id = item.id;
  });

  li.classList.add("li");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.classList.add("del");
  li.append(deleteButton);
  list.append(li);
};

const updateTotal = () => {
  const totalPrice = items.reduce((sum, { price }) => (sum += price), 0);
  totalEl.textContent = `Total Price: ${totalPrice.toFixed(2)}`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = name.value.trim();
  const itemPrice = Number(price.value);

  if (!itemName || !itemPrice) return;

  addRow(itemName, itemPrice);
  form.reset();
  updateTotal();
});

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.matches(".del")) {
    items = items.filter((item) => item.id !== id);

    e.target.closest("li").remove();
    updateTotal();
  } else if (e.target.matches(".li")) {
    e.target.classList.toggle("bought");
  }
});
