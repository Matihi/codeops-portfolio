"use strict";

const themeButton = document.getElementById("theme");
const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone-number");
const password = document.getElementById("password");

const nameMessage = document.getElementById("name-message");
const emailMessage = document.getElementById("email-message");
const phoneMessage = document.getElementById("phone-message");
const passwordMessage = document.getElementById("password-message");

const numberOfPeople = document.getElementById("number-of-people");

let userList = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const validated = validate(nameValue, emailValue, phoneValue, passwordValue);
  if (validated) {
    saveToStorage(nameValue, emailValue, phoneValue, passwordValue);
    form.reset();
  }
});

const validate = (name, email, phoneNumber, password) => {
  if (name.length < 2) {
    nameMessage.textContent = "Name should be more than 1 character long";
    return false;
  } else {
    nameMessage.textContent = "";
  }

  const emailPattern = /^\w+(?:\.\w+)?@\w+\.\w+$/;

  if (!emailPattern.test(email)) {
    emailMessage.textContent =
      "Please enter a valid email address (for example name@example.com)";
    return false;
  } else {
    emailMessage.textContent = "";
  }

  const phoneNumberPattern = /^(?:\+251|0)[79]\d{8}$/;

  if (!phoneNumberPattern.test(phoneNumber)) {
    phoneMessage.textContent =
      "Invalid format. Use 09, +2519, 07 or +2517 followed by 8 digits";
    return false;
  } else {
    phoneMessage.textContent = "";
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]+$/;

  if (password.length < 8) {
    passwordMessage.textContent =
      "Password should contain at least eight characters.";
    return false;
  } else if (!passwordPattern.test(password)) {
    passwordMessage.textContent =
      "Password should contain at least one lower case, one upper case, one digit and one special character";
    return false;
  } else {
    passwordMessage.textContent = "";
  }

  return true;
};

const saveToStorage = (name, email, phoneNumber, password) => {
  const data = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  };

  console.log(data);
  const usersKey = "userInformation";
  let users = localStorage.getItem(usersKey);
  if (!users) {
    users = `{ "userData": [] }`;
  }

  const usersObject = JSON.parse(users);
  console.log(usersObject);
  let userArray = usersObject.userData;
  userArray.push(data);
  console.log(userArray);
  usersObject.userData = userArray;
  const userString = JSON.stringify(usersObject);
  console.log(userString);
  localStorage.setItem(usersKey, userString);
};

window.addEventListener("DOMContentLoaded", (e) => {
  const usersKey = "userInformation";
  let users = localStorage.getItem(usersKey);
  if (!users) {
    users = `{ "userData": [] }`;
  }

  const usersObject = JSON.parse(users);
  console.log(usersObject);
  let userArray = usersObject.userData;
  const count = userArray.length;
  numberOfPeople.textContent = String(count) + " People have signed up";
});

themeButton.addEventListener("click", (e) => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}
