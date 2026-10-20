"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const etb = (v) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

const Report = ({ data, ordersPerDay }) => {
  return (
    <>
      <figure>
        <figcaption>Revenue by neighbourhood</figcaption>
        <ResponsiveContainer width="95%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="area" />
            <YAxis tickFormatter={etb} width={80} />
            <Tooltip formatter={(v) => [etb(v), "Revenue"]} />

            <Bar dataKey="revenue" fill="#1B4D8E" />
          </BarChart>
        </ResponsiveContainer>
      </figure>

      <figure>
        <figcaption>
          Number of orders per day from monday(2026-10-19) to sunday(2026-10-25)
        </figcaption>
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={ordersPerDay}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line dataKey="numberOfOrders" fill="#1B4D8E" />
          </LineChart>
        </ResponsiveContainer>
      </figure>
    </>
  );
};

export default Report;
