import PropTypes from "prop-types";
import { FaPepperHot } from "react-icons/fa";
import { useState } from "react";

import "./Dish.css";

const Dish = (props) => {
  PropTypes.checkPropTypes(Dish.propTypes, props, "prop", "Dish");

  const {
    id,
    changeQuantity,
    onChangeQuantity,
    image,
    name,
    category,
    price,
    spicy = false,
    currency = "ETB",
  } = props;

  const currentDish = changeQuantity.find((dish) => dish.id === id);
  const count = currentDish ? currentDish.quantity : 0;

  const handleIncrement = () => {
    const maxOrderLimit = 15;

    const updatedQuantityDishes = changeQuantity.map((dish) =>
      dish.id === id
        ? {
            ...dish,
            quantity:
              dish.quantity < maxOrderLimit ? dish.quantity + 1 : maxOrderLimit,
          }
        : dish,
    );

    return onChangeQuantity(updatedQuantityDishes);
  };

  const handleDecrement = () => {
    const minOrderLimit = 1;

    const updatedQuantityDishes = changeQuantity.map((dish) =>
      dish.id === id
        ? {
            ...dish,
            quantity: dish.quantity >= minOrderLimit ? dish.quantity - 1 : 0,
          }
        : dish,
    );

    return onChangeQuantity(updatedQuantityDishes);
  };

  return (
    <>
      <div className="image-container">
        <img src={image} alt={name} className="card-image" />
      </div>
      <div className="text-container">
        <h3>
          {name} {spicy === true && <FaPepperHot />}
        </h3>
        <strong>{category}</strong>

        <strong>
          {price} {currency}
        </strong>
        <div className="count-container">
          <button className="remove" onClick={handleDecrement}>
            {"\u2212"}
          </button>
          {count > 0 ? <p className="count">{count}</p> : <p></p>}
          <button className="add-to-cart" onClick={handleIncrement}>
            {"\u002B"}
          </button>
        </div>
      </div>
    </>
  );
};

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  changeQuantity: PropTypes.array.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
  currency: PropTypes.string,
};

export default Dish;
