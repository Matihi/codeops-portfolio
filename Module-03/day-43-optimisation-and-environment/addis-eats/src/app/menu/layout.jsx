import SideBar from "./SideBar";
import Counter from "./Counter";
const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <div>
        <SideBar />
        <Counter />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default layout;
