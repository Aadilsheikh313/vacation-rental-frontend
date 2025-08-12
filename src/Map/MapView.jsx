// src/Map/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// fix default icon paths (Vite + leaflet)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView({ center, pois = [], zoom = 13 }) {
  if (!center) return <div>No center</div>;
  return (
    <MapContainer center={[center.lat, center.lon]} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* center marker */}
      {/* center marker */}
      <Marker position={[center.lat, center.lon]}>
        <Popup>
          <strong>{center.name || center.local_name || center.english_name || "Center"}</strong><br />
          {center.tags?.tourism && <span>{center.tags.tourism}</span>}<br />
          {center.route && (
            <small>
              {Math.round(center.route.distance / 1000)} km · {Math.round(center.route.duration / 60)} min
            </small>
          )}<br />
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&origin=${coords.latitude},${coords.longitude}&destination=${center.lat},${center.lon}&travelmode=driving`,
                    "_blank"
                  );
                },
                () => alert("Location access denied!")
              );
            }}
          >
            Directions from my location
          </button>
        </Popup>
      </Marker>
      {pois.map(p => (
        <Marker key={p.id} position={[p.lat, p.lon]}>
          <Popup>
            <strong>{p.name}</strong><br />
            {p.tags && p.tags.tourism && <span>{p.tags.tourism}</span>}<br />
            {p.route && <small>{Math.round(p.route.distance / 1000)} km · {Math.round(p.route.duration / 60)} min</small>}<br />
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`} target="_blank" rel="noreferrer">Directions</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
