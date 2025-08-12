// src/components/PlaceCard.jsx
import React from "react";
import styles from "../stylesModule/PlaceCard.module.css";

export default function PlaceCard({ place, distance }) {

  // Function to handle "Open in Maps" click
  const handleOpenInMaps = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${place.lat},${place.lon}&travelmode=driving`;
        window.open(url, "_blank");
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please allow location access.");
      }
    );
  };

  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{place.name}</h4>

      <div className={styles.infoRow}>
        {place.tags?.tourism && (
          <span className={styles.tag}>Type: {place.tags.tourism}</span>
        )}
        {distance && (
          <span className={styles.distance}>
            {distance} km
          </span>
        )}
      </div>

      {place.route && (
        <div className={styles.routeInfo}>
          Distance: {(place.route.distance / 1000).toFixed(1)} km ·{" "}
          {Math.round(place.route.duration / 60)} min
        </div>
      )}

      <button className={styles.mapLink} onClick={handleOpenInMaps}>
        Open in Maps
      </button>
    </div>
  );
}
