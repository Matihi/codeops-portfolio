import MenuClient from "./MenuClient";

const Menu = async ({ searchParams }) => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { category } = await searchParams;

  return (
    <section className="p-1">
      <h1>Menu</h1>
      <MenuClient />
    </section>
  );
};

export default Menu;
