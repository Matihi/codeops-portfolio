"use strict";

const form = document.getElementById("form");
const input = document.getElementById("full-name");
const list = document.createElement("ul");
const div5 = document.getElementsByClassName("div5");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.textContent = text;
  list.append(li);
  input.value = "";
});
div5[0].append(list);
