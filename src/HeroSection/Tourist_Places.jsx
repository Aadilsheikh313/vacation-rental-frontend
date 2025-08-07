import React, { useEffect, useRef, useState } from "react";
import NavigationButtons from "../components/NavigationButtons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { getApprovedPostAdmin } from "../config/redux/action/adminPostAction";
import { resetStatus } from "../config/redux/reducer/adminPostReducer";

// Category mapping
const mapDisplayCategoryToBackend = (label) => {
  const mapping = {
    "Natural Attractions": "Natural",
    "Historical & Cultural": "Cultural",
    "Urban & Modern Cities": "Urban",
    "Theme Parks": "Theme Park",
    "Wellness & Spiritual": "Wellness & Spiritual",
    "Adventure & Sports": "Adventure Sports",
    "Culinary": "Culinary",
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

const TouristAndPlace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const contentRef = useRef(null);

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

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter logic based on selected category
  const filteredPlaces =
    selectedCategory === "All"
      ? approvedPosts
      : approvedPosts.filter(
          (post) =>
            post.category === mapDisplayCategoryToBackend(selectedCategory)
        );

  return (
    <div className="container py-5">
      <NavigationButtons />

      {/* Explore Button */}
      <div className="text-center mb-4">
        <button
          onClick={scrollToContent}
          className="btn btn-primary px-4 py-2 fs-5 fw-bold rounded-pill"
        >
          🌍 Explore Tourist Moments
        </button>
      </div>

      {/* Intro Section */}
      <h1 className="display-5 fw-bold text-center mt-5">
        Discover the World Beyond Booking
      </h1>
      <p className="lead text-center text-muted px-3">
        Not every journey needs a reservation—some are meant to be felt.
      </p>
      <p className="text-center text-primary fw-semibold">
        Travel not to escape life, but so life doesn't escape you.
      </p>

      {/* Category Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 my-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${
              selectedCategory === cat ? "btn-dark" : "btn-outline-secondary"
            } rounded-pill px-3`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Container className="py-4" ref={contentRef}>
        {isLoading && (
          <div className="text-center my-3">
            <Spinner animation="border" />
          </div>
        )}

        {isError && (
          <Alert variant="danger">{message || "Something went wrong!"}</Alert>
        )}

        {!isLoading && isSuccess && filteredPlaces.length === 0 && (
          <Alert variant="info">No Explore Tourist Moments available.</Alert>
        )}

        <Row>
          {filteredPlaces?.map((post) => (
            <Col key={post._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                {post.images && post.images[0]?.url && (
                  <Card.Img
                    variant="top"
                    src={post.images[0].url}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {post.city}, {post.country}
                  </Card.Text>
                  <Card.Text>
                    <strong>Category:</strong> {post.category} <br />
                    <strong>Subcategory:</strong> {post.subcategory}
                  </Card.Text>
                  <Card.Text>
                    <strong>Best Time:</strong> {post.bestTimeToVisit}
                  </Card.Text>
                  <Card.Text>
                    <strong>History:</strong> {post.history}
                  </Card.Text>
                </Card.Body>
                <div className="card-footer bg-transparent border-0">
                  <button className="btn btn-outline-primary w-100 rounded-pill">
                    ✈️ Know More
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TouristAndPlace;
