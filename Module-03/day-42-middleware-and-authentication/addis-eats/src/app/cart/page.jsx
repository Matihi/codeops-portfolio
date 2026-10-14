"use client";
import React from "react";
import ToCheckout from "./ToCheckout";
import useCart from "@/context/cart/useCart";

const Cart = () => {
  const { cart, totalItems } = useCart();
  const cartElements = cart.cartItems.map((item) => (
    <li className="flex space-x-0.5" key={item.id}>
      <p>{`${item.quantity}x`}</p>
      <p>{item.id}</p>
      <p>{`ETB ${item.price}`}</p>
    </li>
  ));
  return (
    <div>
      <h1>Your Cart</h1>
      {totalItems <= 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>{cartElements}</ul>
          <ToCheckout />
        </>
      )}
    </div>
  );
};

export default Cart;
