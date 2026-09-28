import { notFound } from "next/navigation";
import React from "react";

const DishDetail = async ({ params }) => {
  const { slug } = await params;

  if (!(slug === "doro-wot" || slug === "shiro")) {
    notFound();
  }
  return <div>DishDetail {slug}</div>;
};

export default DishDetail;
