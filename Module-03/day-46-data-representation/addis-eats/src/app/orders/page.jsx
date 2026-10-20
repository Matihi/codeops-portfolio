import { mockOrders } from "@/lib/db";
import CancelOrderButton from "./CancelOrderButton";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";

export const metadata = {
  title: "Orders",
  description: "View your orders.",
};

const Orders = async () => {
  const user = await getSession();
  if (!user) {
    redirect("/login?next=/orders");
  }
  const role = await getRole(user.userId);
  console.log("role: ", role);

  if (!role) {
    return <p>User not found.</p>;
  }
  if (role !== "customer") {
    return <p>403 Unauthorized</p>;
  }
  const activeOrders = mockOrders.filter(
    (order) => order.status !== "CANCELLED",
  );
  const numberOfActiveOrders = activeOrders.length;
  console.log("numberOfActiveOrders: ", numberOfActiveOrders);
  console.log("activeOrders: ", activeOrders);

  const orderElements = activeOrders.map((order) => (
    <li className="bg-gray-300 w-fit" key={order.id}>
      <Link href={`/orders/${order.id}`}>
        <p>{`Id: ${order.id}`}</p>
        <p>{`Customer Name: ${order.name}`}</p>
        <p>{`Customer Phone: ${order.phone}`}</p>
        <p>{`Delivery area: ${order.area}`}</p>
        <p>{`Order Quantity: ${order.quantity}`}</p>
        <p>{`Date: ${order.createdAt}`}</p>
      </Link>
      <CancelOrderButton id={order.id} />
    </li>
  ));
  return (
    <div>
      <p>Your Orders</p>
      {numberOfActiveOrders === 0 ? (
        <p>No Orders</p>
      ) : (
        <ul className="flex flex-col gap-1">{orderElements}</ul>
      )}
    </div>
  );
};

export default Orders;
