import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapComponent = ({ coordinates, location }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    console.log("Map coordinates:", coordinates);
    if (!coordinates?.coordinates || coordinates.coordinates.length !== 2) {
      console.warn("❌ Coordinates missing or invalid!");
      return;
    }

    const [lng, lat] = coordinates.coordinates;

    // ✅ Avoid re-initializing the map
    if (map.current) {
      console.log("Map already initialized");
      return;
    }

    // Initialize the map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 13,
    });

    // Add marker
    new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<strong>${location}</strong>`))
      .addTo(map.current);

    // Clean up map on unmount
    return () => map.current.remove();
  }, [coordinates, location]);

  return (
    <div
      ref={mapContainer}
      style={{ height: "400px", width: "100%", borderRadius: "10px", marginTop: "20px" }}
    />
  );
};

export default MapComponent;
