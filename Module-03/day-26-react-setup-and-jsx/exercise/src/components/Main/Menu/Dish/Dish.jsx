import "./Dish.css";

const Dish = ({ image, name, price }) => {
  return (
    <article className="dish-card">
      <div className="image-container">
        <img src={image} alt={name} className="card-image" />
      </div>
      <div className="text-container">
        <h3>{name}</h3>
        <strong>{price} ETB</strong>
      </div>
    </article>
  );
};

export default Dish;
