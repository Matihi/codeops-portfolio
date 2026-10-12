import { getOrder } from "@/lib/db";

const orderPage = async ({ params }) => {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    return <p>Order not found.</p>;
  }
  return <p>{`Order id: ${order.id}`}</p>;
};

export default orderPage;
