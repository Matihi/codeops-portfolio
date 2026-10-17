import CheckoutForm from "./CheckoutForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

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
