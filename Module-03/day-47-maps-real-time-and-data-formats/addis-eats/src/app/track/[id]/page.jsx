import MapPanel from "./MapPanel";
import { getOrder } from "@/lib/db";
import { notFound } from "next/navigation";

const Track = async ({ params }) => {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    notFound();
  }
  return (
    <>
      <h1 className="p-1">Track your delivery</h1>
      <MapPanel />
    </>
  );
};

export default Track;
