import React from "react";

const DishDetail = async ({ params }) => {
  const { slug } = await params;
  return <div>DishDetail {slug}</div>;
};

export default DishDetail;
