import PropTypes from "prop-types";
import { FaPepperHot, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCartStore from "../../../../stores/cartStore";

import "./Dish.css";

const Dish = (props) => {
  PropTypes.checkPropTypes(Dish.propTypes, props, "prop", "Dish");

  const {
    id,
    image,
    name,
    nameAm,
    price,
    slug,
    spiceLevel,
    isFasting,
    isSpecial,
    description,
    currency = "ETB",
  } = props;

  const dishForCart = {
    id: id,
    name: name,
    nameAm: nameAm,
    price: price,
    description: description,
    image: image,
    quantity: 0,
  };

  const cartDish = useCartStore((s) =>
    s.cartItems.find((dish) => dish.id === id),
  );

  const count = cartDish?.quantity ?? 0;

  const addDIsh = useCartStore((s) => s.addDish);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeDish = useCartStore((s) => s.removeDish);

  const handleAddingToCart = () => addDIsh(dishForCart);

  const handleIncrement = () => incrementQuantity(id);

  const handleDecrement = () => decrementQuantity(id);

  const handleRemove = () => removeDish(id);

  return (
    <>
      <div className="image-and-text-wrapper">
        <div className="image-container">
          <Link className="image-container-link" to={`/menu/${slug}`}>
            <img src={image} alt={name} className="card-image" />
          </Link>
          <p className="spiceLevel">{spiceLevel}</p>
          {isSpecial && <p className="special">Chef's Special</p>}
          {isFasting && <p className="vegan">Vegan/ጾም</p>}
        </div>

        <div className="text-container">
          <h3>{`${name}`}</h3>
          <h4>{nameAm}</h4>
          <p className="description">{description}</p>
        </div>
      </div>

      <div className="price-and-button-group">
        <div className="card-price">
          {currency}
          <p>{price}</p>
        </div>
        <div className="button-group">
          {cartDish === undefined ? (
            <button className="add-to-cart" onClick={handleAddingToCart}>
              {"\u002B Add"}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameAm: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
  currency: PropTypes.string,
};

export default Dish;
