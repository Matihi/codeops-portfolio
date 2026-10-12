"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const OrderStatus = ({ id, initial }) => {
  const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial,
    refreshInterval: 5000,
  });
  if (isLoading && !data) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load the order.</p>;
  }

  return <div>{`Order status: ${data.status}`}</div>;
};

export default OrderStatus;
