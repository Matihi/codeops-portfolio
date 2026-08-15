"use strict";

const menu = document.getElementById("menu");
const menuGrid = document.getElementById("menu-grid");
const refreshButton = document.getElementById("refresh");

const showLoading = () => {
  menuGrid.textContent = "...Loading";
};

const showError = () => {
  menuGrid.textContent = "Could not load the menu";
};

const getDishes = async () => {
  const response = await fetch(
    "https://dummyjson.com/recipes?select=name,image",
  );

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const dishes = await response.json();
  return dishes;
};

const load = async () => {
  showLoading();
  try {
    const dishes = await getDishes();
    const dishesList = dishes.recipes;
    menuGrid.textContent = "";
    menu.classList.add("menu");
    menuGrid.classList.add("menu-grid");
    dishesList.forEach((dish) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");

      const image = document.createElement("img");
      image.classList.add("card-image");
      image.src = dish.image;
      image.alt = dish.name;
      image.width = 300;
      image.height = 300;
      imageContainer.append(image);

      const name = document.createElement("p");
      name.textContent = dish.name;
      name.classList.add("food-name");
      textContainer.append(name);

      card.append(imageContainer, textContainer);
      menuGrid.append(card);
    });

    menu.append(menuGrid);
  } catch (error) {
    showError();
  }
};

load();

refreshButton.addEventListener("click", load);
