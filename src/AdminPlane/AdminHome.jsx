import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { getAllPropertyAdminPosts } from "../config/redux/action/adminHomeDashAction";
import { resetAdminState } from "../config/redux/reducer/adminHomeDashReducer";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const AdminHome = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const {
    adminProperties,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminHomeDash);


  useEffect(() => {
    dispatch(getAllPropertyAdminPosts());

    return () => {
      dispatch(resetAdminState());
    };
  }, [dispatch]);

  // ✅ Filtering logic only
  const filteredPosts = useMemo(() => {
    if (adminProperties.length > 0) {
      return adminProperties;  // ✅ Agar API result aaya hai to wahi show karo
    }

    return posts.filter((p) => {
      if (p.status === false) return false;

      const matchesText =
        p.title.toLowerCase().includes(search) ||
        p.city?.toLowerCase().includes(search);

      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

      return matchesText && matchesPrice;
    });
  }, [adminProperties, posts]);


  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">🛠 Admin Dashboard - All Properties</h2>

      {/* Show loading spinner */}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Show error alert */}
      {isError && (
        <Alert variant="danger" className="text-center">
          {message}
        </Alert>
      )}

      {/* Show message if no properties */}
      {!isLoading && isSuccess && adminProperties.length === 0 && (
        <Alert variant="info" className="text-center">
          No properties found.
        </Alert>
      )}

      {/* Render properties */}
      <Row>
        {adminProperties.map((property) => (
          <Col key={property._id} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              {property.image.url?.[0] && (
                <Card.Img
                  variant="top"
                  src={property.image.url}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {property.city}, {property.state}
                  <br />
                  <strong>Price:</strong> ₹{property.price} /night
                  <br />
                </Card.Text>
                {property.totalReviews > 0 ? (
                  <p className="text-warning"><b>Rating</b>⭐ {property.avgRating} ({property.totalReviews} reviews)</p>
                ) : (
                  <p className="text-white-muted">No rating and reviews yet.</p>
                )}
                <Link to={`/admin/property/${property._id}`} className="btn btn-primary">
                  <FaEye /> View
                </Link>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminHome;
