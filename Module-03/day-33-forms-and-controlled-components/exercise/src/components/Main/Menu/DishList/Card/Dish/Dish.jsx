import PropTypes from "prop-types";
import { FaPepperHot, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCartStore from "../../../../../../stores/cartStore";

import "./Dish.css";

const Dish = (props) => {
  PropTypes.checkPropTypes(Dish.propTypes, props, "prop", "Dish");

  const {
    id,
    image,
    name,
    category,
    price,
    slug,
    spicy = false,
    currency = "ETB",
  } = props;

  const dishForCart = { id: id, name: name, price: price, quantity: 0 };
  console.log(dishForCart);

  const cartDish = useCartStore((s) =>
    s.cartItems.find((dish) => dish.id === id),
  );
  const addDish = useCartStore((s) => s.addDish);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeDish = useCartStore((s) => s.removeDish);

  console.log("cartDish");
  console.log(cartDish);

  const count = cartDish?.quantity ?? 0;

  const handleAddingToCart = () => {
    addDish(dishForCart);
  };

  const handleIncrement = () => {
    incrementQuantity(id);
  };

  const handleDecrement = () => {
    decrementQuantity(id);
  };

  const handleRemove = () => {
    removeDish(id);
  };

  return (
    <>
      <Link className="image-container" to={`/menu/${slug}`}>
        <img src={image} alt={name} className="card-image" />
      </Link>
      <div className="text-container">
        <h3>
          {name} {spicy === true && <FaPepperHot />}
        </h3>
        <strong>{category}</strong>

        <strong>
          {price} {currency}
        </strong>
        <div className="button-group">
          {cartDish === undefined ? (
            <button className="add-to-cart" onClick={handleAddingToCart}>
              Add to Cart
            </button>
          ) : (
            <div className="count-container">
              <button className="remove" onClick={handleRemove}>
                <FaTrashAlt />
              </button>
              <div className="decCountInc">
                <button className="decrement" onClick={handleDecrement}>
                  {"\u2212"}
                </button>
                {count > 0 ? <p className="count">{count}</p> : <p></p>}
                <button className="increment" onClick={handleIncrement}>
                  {"\u002B"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
  currency: PropTypes.string,
};

export default Dish;
