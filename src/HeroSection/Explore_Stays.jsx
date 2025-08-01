import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import styles from "../stylesModule/HeroModule/Explore.module.css";
import NavigationButtons from "../components/NavigationButtons";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const categories = [
  "All",
  "Hotels",
  "Guest Houses",
  "Apartments",
  "Villas",
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

const ExploreAndStay = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dispatch = useDispatch();

  // Redux State
  const { posts, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch]);

  // Category filter
  const filteredProperties =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // 👇 Limit to first 4 categories for mobile
  const isMobiles = window.innerWidth <= 768;
  const visibleCategories = isMobiles && !showAllCategories
    ? categories.slice(0, 4)
    : categories;

  return (
    <Container className={styles.exploreContainer}>
      <NavigationButtons/>
      <h2 className={styles.stayTitle}>Discover. Stay. Enjoy.</h2>
      <p className={styles.staySubtext}>
        Where unforgettable journeys begin — explore hidden gems and peaceful stays across India 🌍
      </p>

      <motion.div className={styles.propertyButtons}>
        {visibleCategories.map((cat, idx) => (
          <motion.div key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Button
              variant={selectedCategory === cat ? "success" : "outline-secondary"}
              onClick={() => setSelectedCategory(cat)}
              className={styles.categoryButton}
              size="sm"
            >
              {cat}
            </Button>
          </motion.div>
        ))}
        {isMobile && (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowAllCategories(!showAllCategories)}
            className={styles.categoryButton}
          >
            {showAllCategories ? "View Less" : "View More"}
          </Button>
        )}
      </motion.div>

      {!isLoading && filteredProperties?.length > 0 && (
        <Row>
          {filteredProperties.map((property, index) => (
            <Col key={property._id || index} xs={12} sm={6} md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className={styles.propertyCard}>
                  <Card.Img
                    variant="top"
                    src={property.image?.url}
                    alt={property.title}
                    className={styles.cardImage}
                  />
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>{property.title}</Card.Title>
                    <Card.Text className={styles.cardText}><strong>Category:</strong> {property.category}</Card.Text>
                    <Card.Text className={styles.cardText}><strong>City:</strong> {property.city}</Card.Text>
                    <Card.Text className={styles.cardText}><strong>Price:</strong> ₹{property.price}</Card.Text>
                    <Button
                    as={Link}
                    to={`/property/${property._id}`}
                    className={`${styles.cardButton} `}
                  >
                    <FaEye />  View
                  </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}

      {!isLoading && filteredProperties?.length === 0 && (
        <p className="text-center text-danger">No properties found in this category.</p>
      )}
    </Container>

  );
};

export default ExploreAndStay;
