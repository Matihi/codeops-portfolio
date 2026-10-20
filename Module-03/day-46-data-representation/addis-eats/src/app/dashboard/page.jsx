import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";
import { mockOrders } from "@/lib/db";

const Dashboard = async () => {
  const user = await getSession();
  console.log("user: ", user);

  if (!user) {
    redirect("/login?next=/dashboard");
  }
  const role = await getRole(user.userId);
  console.log("role: ", role);

  if (!role) {
    return <p>User not found.</p>;
  }
  if (role !== "admin") {
    return <p>403 Unauthorized</p>;
  }

  const byArea = ["bole", "megenagna", "piassa", "kazanchis", "legehar"].map(
    (area) => ({
      area,
      revenue: mockOrders
        .filter((order) => order.area === area)
        .reduce((sum, o) => sum + o.totalPrice, 0),
    }),
  );

  return <div>Dashboard</div>;
};

export default Dashboard;
