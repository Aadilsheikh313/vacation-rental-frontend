import React, { useEffect, useRef, useState } from "react";
import styles from "../stylesModule/HomeTroust/Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import truoist1 from "../assets/troustslied1.jpg";
import truoist2 from "../assets/troustsilder2.jpg";
import truoist3 from "../assets/troustsilder3.jpg";
import NavigationButtons from "../components/NavigationButtons";
import { getApprovedPostAdmin } from "../config/redux/action/adminPostAction";
import { resetStatus } from "../config/redux/reducer/adminPostReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { GiCommercialAirplane } from "react-icons/gi";

// Category mapping
const mapDisplayCategoryToBackend = (label) => {
  const mapping = {
    "Natural Attractions": "Natural",
    "Historical & Cultural": "Cultural",
    "Urban & Modern Cities": "Urban",
    "Theme Parks": "Theme Park",
    "Wellness & Spiritual": "Wellness & Spiritual",
    "Adventure & Sports": "Adventure Sports",
    Culinary: "Culinary",
    "Offbeat & Remote": "Offbeat & Remote",
  };
  return mapping[label] || label;
};

// Display categories
const categories = [
  "All",
  "Natural Attractions",
  "Historical & Cultural",
  "Urban & Modern Cities",
  "Theme Parks",
  "Wellness & Spiritual",
  "Adventure & Sports",
  "Culinary",
  "Offbeat & Remote",
];

const HomeTroust = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const contentRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { approvedPosts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminPost
  );

  useEffect(() => {
    dispatch(getApprovedPostAdmin());
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  const filteredPlaces =
    selectedCategory === "All"
      ? approvedPosts
      : approvedPosts.filter(
          (post) =>
            post.category === mapDisplayCategoryToBackend(selectedCategory)
        );

  return (
    <div className={styles.HomeTroustConatiner}>
      {/* 🔹 Hero Carousel */}
      <Carousel interval={3500} pause={false} fade>
        {[truoist1, truoist2, truoist3].map((img, idx) => (
          <Carousel.Item key={idx}>
            <img className={styles.imageslied} src={img} alt={`Slide ${idx}`} />
            {/* Custom Caption */}
            <div className={styles.captionOverlay}>
              <NavigationButtons />
              <h3>Explore Tourist Moments</h3>
              <h3>Discover the World Beyond Booking</h3>
              <p>
                Not every journey needs a reservation—some are meant to be felt.
              </p>
              <p>Travel not to escape life, but so life doesn't escape you.</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* 🔹 Category Filter */}
      <div className={styles.categoryFilter}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.categoryButton} ${
              selectedCategory === cat ? styles.activeCategory : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔹 Places Grid */}
      <div className={styles.TrouConatiner}>
        <Container className="py-4" ref={contentRef}>
          {isLoading && (
            <div className="text-center my-3">
              <Spinner animation="border" />
            </div>
          )}
          {isError && (
            <Alert variant="danger">
              {message || "Something went wrong!"}
            </Alert>
          )}
          {!isLoading && isSuccess && filteredPlaces.length === 0 && (
            <Alert variant="info">No Explore Tourist Moments available.</Alert>
          )}

          <Row>
            {filteredPlaces?.map((post) => (
              <Col key={post._id} md={6} lg={4} className="mb-4">
                <Card className={`${styles.placeCard} shadow-sm`}>
                  {post.images && post.images[0]?.url && (
                    <Card.Img
                      variant="top"
                      src={post.images[0].url}
                      className={styles.cardImage}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>
                      {post.title}
                    </Card.Title>
                    <Card.Text className={styles.cardMeta}>
                      <strong>Category:</strong> {post.category} <br />
                      <strong>Subcategory:</strong> {post.subcategory} <br />
                      <strong>City:</strong> {post.city} <br />
                      <strong>Address:</strong> {post.location} <br />
                      <strong>Country:</strong> {post.country}
                    </Card.Text>
                    <Card.Text className={styles.cardDescription}>
                      <strong>Description:</strong> {post.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Best Time:</strong> {post.bestTimeToVisit}
                    </Card.Text>
                    <Card.Text>
                      <strong>History:</strong> {post.history}
                    </Card.Text>
                  </Card.Body>
                  <div className="card-footer bg-transparent border-0">
                    <button
                      className={styles.knowMoreBtn}
                      onClick={() => navigate(`/touristplace/${post._id}`)}
                    >
                      <GiCommercialAirplane /> Know More
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomeTroust;
