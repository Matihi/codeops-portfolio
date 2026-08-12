let items = [];

const form = document.getElementById("add-form");
const itemName = document.getElementById("name");
const count = document.getElementById("count");
const list = document.getElementById("list");

function render() {
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.dataset.id = item.id;
    if (item.done) {
      li.classList.add("done");
    }

    const deleteItem = document.createElement("button");
    deleteItem.textContent = "x";
    deleteItem.classList.add("del");
    li.append(deleteItem);
    list.append(li);
  });

  count.textContent = items.length + " items";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = itemName.value.trim();
  if (!name) return;
  items.push({
    id: Date.now(),
    name,
    done: false,
  });
  itemName.value = "";
  render();
});

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.matches(".del")) {
    items = items.filter((item) => item.id !== id);
  } else {
    const item = items.find((item) => item.id === id);
    if (item) {
      item.done = !item.done;
    }
  }
  render();
});
