import Dish from "./Card/Dish/Dish";
import Card from "./Card/Card";
import { useEffect, useState } from "react";
import "./DishList.css";

const DishList = ({ dishes }) => {
  let initialArrayToCalculateTotalPrice = dishes.map((dish) => {
    return { id: dish.id, price: dish.price, quantity: 0 };
  });

  const [totalArray, setTotalArray] = useState(
    initialArrayToCalculateTotalPrice,
  );

  useEffect(() => {
    setTotalArray(
      dishes.map((dish) => ({ id: dish.id, price: dish.price, quantity: 0 })),
    );
  }, [dishes]);

  if (dishes.length === 0)
    return (
      <p className="empty-message">
        Sorry, dishes in this category are not available
      </p>
    );

  const currency = "USD";

  const dishElements = dishes.map((dish) => (
    <Card key={dish.id}>
      <Dish
        id={dish.id}
        name={dish.name}
        category={dish.category}
        price={dish.price}
        spicy={dish.spicy}
        image={dish.image}
        // currency={currency} //If uncommented "USD" is shown;
        changeQuantity={totalArray}
        onChangeQuantity={setTotalArray}
      />
    </Card>
  ));

  const totalPrice = totalArray.reduce((acc, current) => {
    return acc + current.price * current.quantity;
  }, 0);

  return (
    <section className="dish-list">
      <h2>Our Menu</h2>
      <p>Total = {totalPrice.toLocaleString()} ETB</p>
      <div className="dish-list-grid">{dishElements}</div>
    </section>
  );
};

export default DishList;
