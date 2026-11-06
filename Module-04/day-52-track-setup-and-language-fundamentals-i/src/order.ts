const area = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;

type Area = (typeof area)[number];

type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED"
  | "NOT_COMPLETED";

type Dish = {
  name: string;
  price: number;
};

type Order = {
  readonly id: string;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  total: number;
};

const deliveryFee = (order: Order): number => {
  const minFreeDeliveryThreshold = 50000;
  if (order.total > minFreeDeliveryThreshold) {
    return 0;
  }
  const areaWithLowerFee = "Bole";
  if (order.area === areaWithLowerFee) {
    return 4000;
  }
  return 6000;
};

const changeToSantim = (price: number) => {
  return price * 100;
};

const calculateTotal = (dishes: Dish[]): number => {
  const total = dishes.reduce((acc, curr) => acc + curr.price, 0);
  console.log("total: ", total);
  return total;
};

const dishes: Dish[] = [
  { name: "Doro wot", price: changeToSantim(370.01) },
  { name: "Shiro", price: changeToSantim(130) },
];

const order: Order = {
  id: "abc123",
  customerName: "Abebe",
  area: "Kazanchis",
  dishes: dishes,
  status: "PENDING",
  total: calculateTotal(dishes),
};

const fee = deliveryFee(order);
console.log("fee: ", fee);

const statusMessage = (status: OrderStatus): string => {
  switch (status) {
    case "PENDING":
      return "Waiting for the restaurant to accept";
    case "PREPARING":
      return "Your food is being cooked";
    case "ON_THE_WAY":
      return "The rider has left the restaurant";
    case "DELIVERED":
      return "Delivered - enjoy your meal";
    case "CANCELLED":
      return "This order was cancelled";
    case "NOT_COMPLETED":
      return "Your order has not been completed";
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
};

console.log("status: ", statusMessage(order.status));

const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
});

const formatDishes = (dishes: Dish[]): string => {
  let formatted = "";
  for (const dish of dishes) {
    formatted += ` 
    ${dish.name}, ${etb.format(dish.price / 100)}`;
  }
  return formatted;
};

const receipt = (order: Order): string => {
  return `
  ID: ${order.id}
  Customer name: ${order.customerName}
  Delivery area: ${order.area}
  Dishes: ${formatDishes(order.dishes)}
  Subtotal: ${etb.format(order.total / 100)}
  Delivery fee: ${etb.format(deliveryFee(order) / 100)}
  Total: ${etb.format((order.total + deliveryFee(order)) / 100)}`;
};

console.log("receipt: ", receipt(order));
