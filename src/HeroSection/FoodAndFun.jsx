import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Alert,
  Card,
} from "react-bootstrap";
import NavigationButtons from "../components/NavigationButtons";

// Import React Leaflet components
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issues with Leaflet in React (important)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const categories = [
  "All",
  "Street Food",
  "Restaurant",
  "Cafe",
  "Food",
  "Bar",
  "Local Food",
];

const FoodAndFun = () => {
  const [location, setLocation] = useState(null); // {lat, lon}
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  // Helper to call backend API
  const fetchPlaces = async (endpoint, params) => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(
        `http://localhost:4000/api/food/${endpoint}?${qs}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setPlaces(data.places || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load food places.");
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  // On page load, get location and fetch nearby
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setLocation(coords);
        fetchPlaces("nearby", { ...coords, category: activeCat });
      },
      (err) => {
        console.error("Geo error:", err);
        setError("Failed to get location. Please enable location services.");
      }
    );
  }, []);

  // Refetch when category changes (if we already have location)
  useEffect(() => {
    if (location) {
      fetchPlaces("nearby", { ...location, category: activeCat });
    }
  }, [activeCat]);

  // Search button click
  const handleSearch = () => {
    if (!search.trim()) return;
    fetchPlaces("search", { q: search.trim(), category: activeCat });
  };

  return (
    <Container className="py-4 text-center">
      <NavigationButtons />

      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-4"
      >
        {location
          ? "What's tasty near you?"
          : "Allow location or search for a city"}
      </motion.h2>

      {/* Search Box */}
      <Form className="d-flex justify-content-center mb-3">
        <Form.Control
          type="text"
          placeholder="Search a location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
        <Button onClick={handleSearch} className="ms-2">
          Search
        </Button>
      </Form>

      {/* Category Buttons */}
      <div className="mb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === activeCat ? "warning" : "light"}
            onClick={() => setActiveCat(cat)}
            className="me-2 mb-2"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading Spinner */}
      {loading && (
        <div className="my-5">
          <Spinner animation="border" />
          <p>Finding delicious places near you...</p>
        </div>
      )}

      {/* Places List */}
      {!loading && !error && places.length > 0 && (
        <>
          <Row>
            {places.map((place, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card className="shadow-sm">
                    {/* No images in your data? So skipping place.image */}
                    <Card.Body>
                      <Card.Title>{place.title || place.name}</Card.Title>
                      <Card.Text>
                        {place.description || place.address}
                      </Card.Text>
                      <small className="text-muted">
                        Category: {place.type || "Unknown"}
                      </small>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Map Section */}
          {location && (
            <div style={{ height: "400px", marginTop: "2rem" }}>
              <MapContainer
                center={[location.lat, location.lon]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Circle with 10km radius */}
                <Circle
                  center={[location.lat, location.lon]}
                  radius={10000}
                  pathOptions={{ color: "blue", fillOpacity: 0.1 }}
                />

                {/* Markers for places */}
                {places.map((place, idx) => (
                  <Marker key={idx} position={[place.lat, place.lon]}>
                    <Popup>
                      <strong>{place.title}</strong>
                      <br />
                      {place.description}
                    </Popup>
                  </Marker>
                ))}

                {/* Marker for center location */}
                <Marker position={[location.lat, location.lon]}>
                  <Popup>Your location</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {!loading && !error && places.length === 0 && (
        <p>No food places found for this category.</p>
      )}
    </Container>
  );
};

export default FoodAndFun;
