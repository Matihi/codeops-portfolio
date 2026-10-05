import CategoryBar from "./CategoryBar";
const SideBar = () => {
  const categories = [
    { id: 0, category: "All Dishes" },
    { id: 1, category: "Traditional Stews & Wat" },
    { id: 2, category: "Tibs & Grills" },
    { id: 3, category: "Raw & Cured Delicacies / Kitfo" },
    { id: 4, category: "Fasting & Vegan / Tsom" },
    { id: 5, category: "Beverages & Tej" },
  ];

  return (
    <aside className="border-r-2 border-black flex flex-col justify-center ">
      <ul className="mt-2">
        <li>All</li>
        <li>Main</li>
        <li>Vegetarian</li>
        <li>Drinks</li>
      </ul>
      <CategoryBar categories={categories} />
    </aside>
  );
};

export default SideBar;
