export const GET = async () => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`External API error: ${res.status}`);
    }
    const { data } = await res.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
