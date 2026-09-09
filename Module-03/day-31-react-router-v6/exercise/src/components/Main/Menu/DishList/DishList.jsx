import Dish from "./Card/Dish/Dish";
import Card from "./Card/Card";
import "./DishList.css";

const DishList = ({ dishes, headingText, emptyMessage }) => {
  if (dishes.length === 0)
    return <p className="empty-message">{emptyMessage}</p>;

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
      />
    </Card>
  ));

  return (
    <section className="dish-list">
      <h3>{headingText}</h3>
      <div className="dish-list-grid">{dishElements}</div>
    </section>
  );
};

export default DishList;
