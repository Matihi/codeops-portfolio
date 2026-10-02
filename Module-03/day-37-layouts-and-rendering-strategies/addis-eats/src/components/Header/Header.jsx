import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-center items-center  bg-red-200 gap-2">
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/checkout">Checkout</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </header>
  );
}

export default Header;
