"use client";
import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="h-80 bg-slate-100" />,
});

const MapPanel = () => {
  return <DeliveryMap />;
};

export default MapPanel;
