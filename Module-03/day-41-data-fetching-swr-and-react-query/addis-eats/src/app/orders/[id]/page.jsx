import { getOrder } from "@/lib/db";
import { notFound } from "next/navigation";
import OrderStatus from "./OrderStatus";

const orderPage = async ({ params }) => {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    notFound();
  }
  return <OrderStatus id={id} />;
};

export default orderPage;
