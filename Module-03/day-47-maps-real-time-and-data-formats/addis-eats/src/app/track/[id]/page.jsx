import MapPanel from "./MapPanel";
import { getOrder } from "@/lib/db";

const Track = async ({ params }) => {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    return <p>Order not found.</p>;
  }
  return (
    <>
      <h1 className="p-1">Track your delivery</h1>
      <MapPanel />
    </>
  );
};

export default Track;
