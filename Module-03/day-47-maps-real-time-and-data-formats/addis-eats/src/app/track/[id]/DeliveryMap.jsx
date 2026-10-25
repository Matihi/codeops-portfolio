"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

//this works
// L.divIcon({
//           iconSize: [32, 32],
//           iconAnchor: [32 / 2, 32 + 9],
//           className: "mymarker",
//           html: "😁",
//         })

const BOLE = [8.995, 38.7896];

const DeliveryMap = () => {
  return (
    <MapContainer center={BOLE} zoom={14} style={{ height: "320px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/
{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={BOLE} icon={customMarkerIcon}>
        <Popup>Your location</Popup>
      </Marker>
      <Marker position={[8.99, 38.72]} icon={customMarkerIcon}>
        <Popup>
          <p>Abebe is on the way!</p>
          <p>Delivering your food</p>
          <p>Arriving in 20 mins</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DeliveryMap;
