import PropTypes from "prop-types";
import { FaPepperHot } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../../../../../context/cart/CartProvider";

import "./Dish.css";

const Dish = (props) => {
  PropTypes.checkPropTypes(Dish.propTypes, props, "prop", "Dish");

  const {
    id,
    image,
    name,
    category,
    price,
    spicy = false,
    currency = "ETB",
  } = props;

  const cartContextValue = useContext(CartContext);
  console.log(cartContextValue);

  const dishForCart = { id: id, name: name, price: price, quantity: 0 };
  console.log(dishForCart);

  const cartDish = cartContextValue.cart.cartItems.find(
    (dish) => dish.id === id,
  );

  console.log("cartDish");
  console.log(cartDish);

  const count = cartDish?.quantity ?? 0;

  const handleAddingToCart = () => {
    cartContextValue.dispatch({
      type: "dish_added",
      dish: dishForCart,
    });
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
        <>
          {cartDish === undefined ? (
            <button className="add-to-cart" onClick={handleAddingToCart}>
              Add to Cart
            </button>
          ) : (
            <div className="count-container">
              <button
                onClick={() =>
                  cartContextValue.dispatch({
                    type: "dish_removed",
                    id: id,
                  })
                }
              >
                X
              </button>
              <button
                className="decrement"
                onClick={() =>
                  cartContextValue.dispatch({
                    type: "quantity_decremented",
                    id: id,
                  })
                }
              >
                {"\u2212"}
              </button>
              {count > 0 ? <p className="count">{count}</p> : <p></p>}
              <button
                className="increment"
                onClick={() =>
                  cartContextValue.dispatch({
                    type: "quantity_incremented",
                    id: id,
                  })
                }
              >
                {"\u002B"}
              </button>
            </div>
          )}
        </>
      </div>
    </>
  );
};

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
  currency: PropTypes.string,
};

export default Dish;
