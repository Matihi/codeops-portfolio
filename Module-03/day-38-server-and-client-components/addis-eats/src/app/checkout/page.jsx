import { cookies } from "next/headers";

const Checkout = async () => {
  const cookieStore = await cookies();
  const item = cookieStore.get("item");
  return <div>Checkout</div>;
};

export default Checkout;
