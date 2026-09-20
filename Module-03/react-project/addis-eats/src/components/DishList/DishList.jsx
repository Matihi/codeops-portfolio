import Dish from "./Card/Dish/Dish";
import Card from "./Card/Card";
import "./DishList.css";

const DishList = ({ dishes, loading, loadingMessage, error, emptyMessage }) => {
  if (loading) return <p>{loadingMessage}</p>;
  if (error) return <p>{error}</p>;
  if (dishes.length === 0)
    return <p className="empty-message">{emptyMessage}</p>;

  const currency = "ETB";

  const dishElements = dishes.map((dish) => (
    <Card key={dish.id}>
      <Dish
        id={dish.id}
        name={dish.nameEn}
        nameAm={dish.nameAm}
        price={dish.priceETB}
        image={`/images/${dish.slug}.png`}
        currency={currency}
        slug={dish.slug}
        spiceLevel={dish.spiceLevel
          .replace(/^choice:\s*/i, "")
          .replace(/\s*\(\d(?:-\d)?\/3\)\s*$/, "")
          .trim()}
        isFasting={dish.isFasting}
        isSpecial={dish.isSpecial}
        description={dish.description}
      />
    </Card>
  ));

  return (
    <section className="dish-list">
      <div className="dish-list-grid">{dishElements}</div>
    </section>
  );
};

export default DishList;
