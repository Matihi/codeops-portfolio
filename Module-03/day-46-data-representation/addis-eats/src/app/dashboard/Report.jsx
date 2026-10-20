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
  console.log("data in report: ", data);

  const theadElements = Object.keys(data[0]).map((key) => (
    <th className="border-l p-2" scope="col" key={key}>
      {key}
    </th>
  ));

  const theadElementsForOrdersPerDay = Object.keys(ordersPerDay[0]).map(
    (key) => (
      <th className="border-l p-2" scope="col" key={key}>
        {key}
      </th>
    ),
  );

  const tbodyElements = data.map((element) => (
    <tr className="border" key={element.area}>
      <td className="border-r">{element.area}</td>
      <td className="text-right">{element.revenue}</td>
    </tr>
  ));

  const tbodyElementsForOrdersPerDay = ordersPerDay.map((element) => (
    <tr className="border" key={element.day}>
      <td className="border-r">{element.day}</td>
      <td className="text-right">{element.numberOfOrders}</td>
    </tr>
  ));

  console.log("abc: ", theadElements);

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

      <table className="border m-4">
        <caption>Revenue by neighbourhood</caption>
        <thead>
          <tr className="border">{theadElements}</tr>
        </thead>
        <tbody>{tbodyElements}</tbody>
      </table>

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

      <table className="border m-4">
        <caption>
          Number of orders per day from monday(2026-10-19) to sunday(2026-10-25)
        </caption>
        <thead>
          <tr>{theadElementsForOrdersPerDay}</tr>
        </thead>
        <tbody>{tbodyElementsForOrdersPerDay}</tbody>
      </table>
    </>
  );
};

export default Report;
