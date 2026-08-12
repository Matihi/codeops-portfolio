const customer = {
  name: "Abebe",
  city: "Addis Ababa",
  balance: 3500,
};

for (const [Key, value] of Object.entries(customer)) {
  console.log(`${Key}: ${value}`);
}

const { name, city } = customer;

const greet = ({ name }) => {
  console.log(`Welcome ${name}`);
};

greet({ name, city });

const updatedCopy = { ...customer, city: "Harar", phone: "0911234567" };
console.log(updatedCopy);
