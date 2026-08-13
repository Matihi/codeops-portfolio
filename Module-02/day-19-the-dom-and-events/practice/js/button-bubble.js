"use strict";

const button = document.getElementById("click");

const div3 = document.getElementsByClassName("div3");

button.addEventListener("click", (e) => {
  const clicked = e.target;
  console.log("Button:", clicked);
});

div3[0].addEventListener("click", (e) => {
  const clicked = e.target;
  console.log("Div:", clicked);
});
