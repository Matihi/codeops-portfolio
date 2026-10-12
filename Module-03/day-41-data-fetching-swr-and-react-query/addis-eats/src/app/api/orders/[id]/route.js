import { getOrder } from "@/lib/db";

export const GET = async (request, { params }) => {
  try {
    const { id } = await params;
    const order = await getOrder(id);

    return Response.json({ order }, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return Response.json(
      { error: "Something went wrong, can't get order." },
      { status: 500 },
    );
  }
};
