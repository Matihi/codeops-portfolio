export const GET = async () => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch from external api" },
        { status: 503 },
      );
    }
    const { data } = await res.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
