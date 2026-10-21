import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";
import { mockOrders } from "@/lib/db";
import Report from "./Report";

const Dashboard = async ({ searchParams }) => {
  const { revenue_sort, page } = await searchParams;

  console.log("sort: ", revenue_sort);

  const revSortOrder = revenue_sort ?? "desc";
  const pageNumber = Number(page) || 1;
  const currentPage = Math.max(pageNumber, 1);
  console.log("pageNumber: ", currentPage);
  const user = await getSession();

  if (!user) {
    redirect("/login?next=/dashboard");
  }
  const role = await getRole(user.userId);

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

  const sortFunction = (order, sortKey) => {
    return order === "desc"
      ? (a, b) => b[sortKey] - a[sortKey]
      : (a, b) => a[sortKey] - b[sortKey];
  };

  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const shownByArea = byArea
    .slice(startIndex, endIndex)
    .sort(sortFunction(revSortOrder, "revenue"));

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

  console.log("shownByArea: ", shownByArea);

  return <Report data={shownByArea} ordersPerDay={ordersPerDay} />;
};

export default Dashboard;
