import "./CategoryBar.css";

const CategoryBar = ({ selected, onSelect, categories }) => {
  const categoryButtons = categories.map((category) => (
    <button
      key={category.id}
      className={
        category.category === selected
          ? "selected-category-button"
          : "category-button"
      }
      onClick={() => onSelect({ category: category.category })}
    >
      {category.category}
    </button>
  ));

  return <div className="category-bar">{categoryButtons}</div>;
};

export default CategoryBar;
