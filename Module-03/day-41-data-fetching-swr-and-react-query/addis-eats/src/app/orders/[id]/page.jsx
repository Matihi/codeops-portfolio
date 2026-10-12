import { getOrder } from "@/lib/db";
import { notFound } from "next/navigation";

const orderPage = async ({ params }) => {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    notFound();
  }
  return <p>{`Order id: ${order.id}`}</p>;
};

export default orderPage;
