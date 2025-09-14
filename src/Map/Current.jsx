import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Current = ({ onLocationFound }) => {
  const [position, setPosition] = useState(null);
  const [locationName, setLocationName] = useState("Loading...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {   // ✅ async lagana zaroori hai
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          onLocationFound({ latitude, longitude });

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            setLocationName(data.display_name || "Unknown Location");
          } catch (error) {
            setLocationName("Unknown Location");
          }
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, [onLocationFound]);

  return (
    <div style={{ height: "250px",  overflow: "hidden" }}>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>{locationName}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading current location...</p>
      )}
    </div>
  );
};

export default Current;
