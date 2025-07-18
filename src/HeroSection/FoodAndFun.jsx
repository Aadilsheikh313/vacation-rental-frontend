import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./FoodAndFun.css";

const foodCategories = ["All", "Street Food", "Restaurants", "Bars", "Cafes", "Local Cuisine"];

const dummyFoodData = [
  { title: "Pav Bhaji", type: "Street Food", description: "Mumbai's favorite snack." },
  { title: "Fine Dine at Taj", type: "Restaurants", description: "Luxury dining experience." },
  { title: "Beer & Beats", type: "Bars", description: "Chill vibes and drinks." },
  { title: "Coffee Corner", type: "Cafes", description: "Perfect place for coffee lovers." },
  { title: "Rajasthani Thali", type: "Local Cuisine", description: "Authentic local flavor." },
];

const FoodAndFun = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFood = activeCategory === "All"
    ? dummyFoodData
    : dummyFoodData.filter((item) => item.type === activeCategory);

  return (
    <div className="food-fun-section">
      <Container className="py-5 text-center text-white">
        <motion.h1
          className="food-title mb-4 text-black"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Taste Joy, Live Moments 🍴🎉
        </motion.h1>

        {/* Top Buttons */}
        <div className="category-buttons mb-4 d-flex flex-wrap justify-content-center gap-2">
          {foodCategories.map((category) => (
            <Button
              key={category}
              variant={category === activeCategory ? "warning" : "light"}
              onClick={() => setActiveCategory(category)}
              className="fw-semibold"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Food Cards / Info */}
        <Row className="justify-content-center">
          {filteredFood.map((item, index) => (
            <Col key={index} md={4} className="mb-4">
              <motion.div
                className="food-card p-3 rounded shadow bg-dark bg-opacity-50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 * index }}
              >
                <h4 className="text-warning">{item.title}</h4>
                <p className="text-light">{item.description}</p>
                <small className="text-info">Category: {item.type}</small>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FoodAndFun;
