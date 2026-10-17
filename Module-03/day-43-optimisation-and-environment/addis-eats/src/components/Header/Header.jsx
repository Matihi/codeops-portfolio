import Link from "next/link";
import CartBadge from "./CartBadge";
import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/session";

async function Header() {
  const user = await getSession();
  return (
    <header className="flex justify-center p-2 gap-1  bg-red-200 ">
      <nav className="flex justify-center items-center gap-2">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link className="flex space-x-0.5" href="/cart">
          <span>Cart</span>
          <CartBadge />
        </Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/orders">Orders</Link>
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
      {user && <LogoutButton />}
    </header>
  );
}

export default Header;
