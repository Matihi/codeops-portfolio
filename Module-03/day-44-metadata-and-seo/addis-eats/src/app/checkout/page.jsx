import CheckoutForm from "./CheckoutForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Checkout",
  description: "Secure checkout",
};

const Checkout = async () => {
  const user = await getSession();
  if (!user) {
    redirect("/login?next=/checkout");
  }
  return (
    <div>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
