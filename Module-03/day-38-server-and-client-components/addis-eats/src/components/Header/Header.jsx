import Link from "next/link";
import CartBadge from "./CartBadge";

function Header() {
  return (
    <header className="flex justify-center items-center  bg-red-200 gap-2">
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link className="flex space-x-0.5" href="/cart">
        <span>Cart</span>
        <CartBadge />
      </Link>
      <Link href="/checkout">Checkout</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </header>
  );
}

export default Header;
