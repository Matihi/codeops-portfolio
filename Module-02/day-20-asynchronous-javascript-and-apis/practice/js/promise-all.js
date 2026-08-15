"use strict";

const getDishes = async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes?select=name");

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const dishes = await response.json();
    const firstTwo = dishes.recipes.slice(0, 2);

    const responses = await Promise.all(
      firstTwo.map((post) => fetch(`https://dummyjson.com/recipes/${post.id}`)),
    );

    const details = await Promise.all(
      responses.map((response) => response.json()),
    );

    console.log(details);
  } catch (err) {
    console.log(err.message);
  }
};

getDishes();
