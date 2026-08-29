import PropTypes from "prop-types";
import { FaPepperHot } from "react-icons/fa";
import { useState } from "react";

import "./Dish.css";

const Dish = (props) => {
  const [count, setCount] = useState(0);

  const handleCount = (e) => {
    const maxOrderLimit = 15;
    const minOrderLimit = 1;
    if (e.target.classList.contains("add-to-cart"))
      setCount((previous) => {
        if (previous < maxOrderLimit) return previous + 1;
        return maxOrderLimit;
      });
    if (e.target.classList.contains("remove"))
      setCount((previous) => {
        if (previous < minOrderLimit) return 0;
        return previous - 1;
      });
  };

  console.log(count);

  PropTypes.checkPropTypes(Dish.propTypes, props, "prop", "Dish");

  const {
    image,
    name,
    category,
    price,
    spicy = false,
    currency = "ETB",
  } = props;

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
          <button className="remove" onClick={handleCount}>
            {"\u2212"}
          </button>

          {count > 0 ? <p className="count">{count}</p> : <p></p>}
          <button className="add-to-cart" onClick={handleCount}>
            {"\u002B"}
          </button>
        </div>
      </div>
    </>
  );
};

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
  currency: PropTypes.string,
};

export default Dish;
