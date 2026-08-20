"use strict";

const state = {
  dishes: [],
  cart: [],
  search: "",
};

const search = document.querySelector(".search-container");
const menu = document.querySelector(".menu");
const cartSection = document.querySelector(".cart");
const cartUl = document.querySelector(".cart-ul");
const total = document.querySelector(".cart-total");
const menuGrid = document.querySelector(".menu-grid");
const API = "./data/menu.json";
const STORAGE_KEY = "addiseats";

const PHONE = /^(?:\+251|0)9\d{8}$/;
const form = document.querySelector("#checkout");
const formError = document.querySelector("#form-error");
const inputName = document.querySelector("#name");
const phoneNumber = document.querySelector("#phone-number");
const deliveryArea = document.querySelector("#area");
const main = document.querySelector("main");

let orderPlaced = false;
let order = {};

const loadMenu = async () => {
  menuGrid.textContent = "Loading Menu...";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP" + res.status);
    state.dishes = await res.json();
    render();
  } catch (err) {
    console.log(err.message);
    menuGrid.textContent = "Could not load the menu.";
  }
};

search.addEventListener("input", (e) => {
  state.search = e.target.value.trim();
  render();
});

menu.addEventListener("click", (e) => {
  if (!e.target.matches(".add-to-order")) return;
  const id = Number(e.target.closest(".food-card").dataset.setId);
  if (!id) return;
  const dish = state.dishes.find((dish) => dish.id === id);
  const cartItem = state.cart.find((item) => item.id === id);
  checkCartItem(cartItem, dish);
  save();
  render();
});

const checkCartItem = (cartItem, dish) => {
  if (cartItem) {
    cartItem.quantity++;
  } else {
    state.cart.push({ ...dish, quantity: 1 });
  }
};

cartSection.addEventListener("click", (e) => {
  if (!e.target.matches(".remove")) return;

  const id = Number(e.target.closest(".cart-item").dataset.setId);
  state.cart = state.cart.filter((item) => item.id !== id);

  save();
  render();
});

const calculateTotal = () => {
  if (state.cart.length === 0) return 0;
  const totalPrice = state.cart
    .map((dish) => {
      return dish.price * dish.quantity;
    })
    .reduce((sum, totalPricePerItem) => (sum += totalPricePerItem), 0);
  return totalPrice;
};

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
};

const load = () => {
  const cartJson = localStorage.getItem(STORAGE_KEY);
  if (cartJson) state.cart = JSON.parse(cartJson);
};

const renderMenu = () => {
  const term = state.search.toLowerCase();

  const shown = state.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(term),
  );
  if (shown.length === 0) {
    menuGrid.textContent =
      "Sorry, looks like the dish you searched for is not available";
    return;
  }

  menuGrid.textContent = "";
  shown.forEach((dish) => {
    const card = document.createElement("article");
    card.dataset.setId = dish.id;
    card.classList.add("food-card");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const image = document.createElement("img");
    image.classList.add("card-image");
    image.src = dish.image;
    image.alt = dish.name;
    const DIMENSION = 160;
    image.width = DIMENSION;
    image.height = DIMENSION;

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    const name = document.createElement("h3");
    name.textContent = dish.name;
    const category = document.createElement("p");
    category.textContent = dish.category;
    const spicy = document.createElement("p");
    const price = document.createElement("p");
    price.textContent = `${dish.price} ETB`;
    const addToOrder = document.createElement("button");
    addToOrder.classList.add("add-to-order");
    addToOrder.textContent = "Add to Order";
    if (dish.spicy) {
      spicy.textContent = "Spicy";
      imageContainer.append(image);
      textContainer.append(name, category, spicy, price, addToOrder);
      card.append(imageContainer, textContainer);
    } else {
      spicy.textContent = "Not spicy";
      spicy.setAttribute("aria-hidden", "true");
      spicy.classList.add("spicy-hidden");

      imageContainer.append(image);
      textContainer.append(name, category, price, spicy, addToOrder);
      card.append(imageContainer, textContainer);
    }
    menuGrid.append(card);
  });
};

const renderCart = () => {
  cartUl.textContent = "";

  if (state.cart.length === 0) {
    cartUl.textContent = "No orders yet";
    total.textContent = "";
    return;
  } else {
    cartUl.textContent = "";
    total.textContent = "";
    state.cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.dataset.setId = item.id;
      cartItem.classList.add("cart-item");
      const div = document.createElement("div");
      const nameAndQuantity = document.createElement("p");
      nameAndQuantity.textContent = `${item.name}(x${item.quantity})`;
      const price = document.createElement("p");
      price.textContent = `${item.price} ETB`;
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      removeButton.textContent = "X";
      div.append(nameAndQuantity, price);
      cartItem.append(div, removeButton);
      cartUl.append(cartItem);
    });

    total.textContent = `Total: ${calculateTotal()} ETB`;
  }
};

const renderConfirmationMessage = () => {
  if (orderPlaced) {
    const messageContainer = document.createElement("dialog");
    messageContainer.classList.add("message-container");
    const confirmationMessage = document.createElement("p");
    const closeButton = document.createElement("button");
    closeButton.textContent = "Ok";
    closeButton.classList.add("close-confirmation");

    confirmationMessage.textContent = `Order placed—${order.total} ETB, delivering to ${order.deliveredTo} `;
    messageContainer.append(confirmationMessage, closeButton);
    document.body.append(messageContainer);
    messageContainer.showModal();

    closeButton.addEventListener("click", (e) => {
      if (!e.target) return;
      messageContainer.close();
      messageContainer.remove();
    });
  }
};

const render = () => {
  renderMenu();
  renderCart();
  renderConfirmationMessage();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    name: inputName.value,
    phone: phoneNumber.value,
    deliveredTo: deliveryArea.value,
  };

  const errorMessage = validateForm(data);
  formError.textContent = errorMessage;
  if (errorMessage) return;
  e.target.reset();
  placeOrder(data);
});

const placeOrder = (data) => {
  order = {
    ...data,
    items: state.cart,
    total: calculateTotal(),
    placedAt: new Date().toISOString(),
  };

  console.log("Order placed:", order);
  state.cart = [];
  save();
  render();
  showConfirmation(order);
};

const showConfirmation = (order) => {
  orderPlaced = true;
  render();
  orderPlaced = false;
  console.log(
    `Order placed—${order.total} ETB, delivering to ${order.deliveredTo} `,
  );
};

const validateForm = ({ name, phone, deliveredTo }) => {
  if (!name.trim()) return "Please enter your name.";
  if (!PHONE.test(phone)) return "Enter a valid Ethiopian phone number";
  if (deliveredTo === "select") return "Please select the area of delivery";

  if (state.cart.length === 0) return "Your cart is empty.";
  return "";
};

const init = async () => {
  load();
  await loadMenu();
};

init();
