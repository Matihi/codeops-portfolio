import "./Dish.css";

function Dish({ name, price }) {
  return (
    <article className="food-card">
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </article>
  );
}

export default Dish;
