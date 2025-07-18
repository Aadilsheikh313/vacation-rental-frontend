import React, { useState } from "react";
import { Button, ButtonGroup, Card, Row, Col, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./ExploreStays.css";

const categories = [
  "All",
  "Hotels",
  "Apartments",
  "Villas",
  "Guest Houses",
  "Resorts",
  "Farmhouses",
  "Cottages",
  "Bungalows",
  "Homestays",
  "Cabins",
  "Treehouses",
  "Boathouses",
  "Hostels",
  "Serviced Apartments",
  "Tent Stays / Camping",
  "Houseboats",
  "Luxury Stays",
];

// 🏡 Sample Properties
const allProperties = [
  { id: 1, name: "Ocean View Villa", category: "Villas" },
  { id: 2, name: "City Center Apartment", category: "Apartments" },
  { id: 3, name: "Himalayan Resort", category: "Resorts" },
  { id: 4, name: "Luxury Treehouse", category: "Treehouses" },
  { id: 5, name: "Classic Hotel", category: "Hotels" },
  { id: 6, name: "Tent Stay Rishikesh", category: "Tent Stays / Camping" },
];

const ExploreAndStay = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProperties =
    selectedCategory === "All"
      ? allProperties
      : allProperties.filter((p) => p.category === selectedCategory);

  return (
    <Container className="explore-stays-container text-center">
      <h2 className="stay-title">Discover. Stay. Enjoy.</h2>
      <p className="stay-subtext">
        Where unforgettable journeys begin — explore hidden gems and peaceful stays across India 🌍
      </p>

      {/* Category Buttons */}
      <div className="property-buttons d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "success" : "outline-secondary"}
            onClick={() => setSelectedCategory(cat)}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Filtered Cards */}
      <Row>
        {filteredProperties.map((property, index) => (
          <Col key={property.id} md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="property-card p-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-white">{property.name}</Card.Title>
                  <Card.Text className="text-white">{property.category}</Card.Text>
                  <Button variant="primary">Book Now</Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {filteredProperties.length === 0 && (
        <p className="text-center text-danger">No properties found in this category.</p>
      )}
    </Container>
  );
};

export default ExploreAndStay;