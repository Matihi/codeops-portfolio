import "./CategoryBar.css";

const CategoryBar = ({ selected, onSelect }) => {
  const categories = [
    { id: 0, category: "All" },
    { id: 1, category: "Main" },
    { id: 2, category: "Vegetarian" },
    { id: 3, category: "Breakfast" },
    { id: 4, category: "Side" },
    { id: 5, category: "Other" },
  ];

  const categoryButtons = categories.map((category) => (
    <button
      key={category.id}
      className={
        category.category === selected
          ? "selected-category-button"
          : "category-button"
      }
      onClick={() => onSelect(category.category)}
    >
      {category.category}
    </button>
  ));

  return <div className="category-bar">{categoryButtons}</div>;
};

export default CategoryBar;
