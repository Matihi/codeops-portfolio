import PropTypes from "prop-types";
import { FaPepperHot } from "react-icons/fa";

import "./Dish.css";

const Dish = (props) => {
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
