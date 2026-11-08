import { inMemoryOrders, OrderRepo, OrderService } from "./orders/index.js";

const orderReop = new OrderRepo(inMemoryOrders);
const orderService = new OrderService(orderReop);
console.log("orderService.find(): ", orderService.find(10));

const key = "status";
console.log(
  `summary by ${key}: [${JSON.stringify(orderService.summarise(key))}]`,
);
console.log("fees by area: ", orderService.feesByArea());
