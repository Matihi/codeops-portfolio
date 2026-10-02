import SideBar from "./SideBar";
const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default layout;
