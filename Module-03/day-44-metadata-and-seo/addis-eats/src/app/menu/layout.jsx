import SideBar from "./SideBar";

export const metadata = {
  title: "Menu",
  description: "View what we offer.",
  alternates: { canonical: "/menu" },
};

const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <div>
        <SideBar />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default layout;
