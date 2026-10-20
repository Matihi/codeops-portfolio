import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";
import { mockOrders } from "@/lib/db";
import Report from "./Report";

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

  const ordersPerDay = [
    {
      date: "2026-10-19",
      day: "Mon",
    },
    {
      date: "2026-10-20",
      day: "Tue",
    },
    {
      date: "2026-10-21",
      day: "Wed",
    },
    {
      date: "2026-10-22",
      day: "Thu",
    },
    {
      date: "2026-10-23",
      day: "Fri",
    },
    {
      date: "2026-10-24",
      day: "Sat",
    },
    {
      date: "2026-10-25",
      day: "Sun",
    },
  ].map(({ date, day }) => ({
    day,
    numberOfOrders: mockOrders
      .filter((order) => order.createdAt.startsWith(date))
      .reduce((acc, curr) => acc + (curr?.quantity ?? 0), 0),
  }));

  console.log("ordersPerDay :", ordersPerDay);

  console.log("mockOrders", mockOrders);
  console.log("byArea: ", byArea);

  return <Report data={byArea} ordersPerDay={ordersPerDay} />;
};

export default Dashboard;
