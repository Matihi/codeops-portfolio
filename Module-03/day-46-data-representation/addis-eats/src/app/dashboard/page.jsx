import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";

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
  return <div>Dashboard</div>;
};

export default Dashboard;
