"use strict";

const div4 = document.querySelector(".div4");
const itemList = document.createElement("ul");

const items = ["Addis Ababa", "Adama", "Gondor"];

items.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  const del = document.createElement("button");
  del.textContent = "x";
  li.append(del);
  itemList.append(li);
});

div4.append(itemList);

itemList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  li.remove();
});
