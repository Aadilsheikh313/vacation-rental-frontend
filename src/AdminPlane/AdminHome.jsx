import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getAllPropertyAdminPosts } from "../config/redux/action/adminHomeDashAction";
import { resetAdminState } from "../config/redux/reducer/adminHomeDashReducer";

const AdminHome = () => {
  const dispatch = useDispatch();

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
              {property.photos?.[0] && (
                <Card.Img
                  variant="top"
                  src={property.photos[0]}
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
                  <strong>Posted by:</strong>{" "}
                  {property.userId?.name || "N/A"} <br />
                  <strong>Email:</strong> {property.userId?.email || "N/A"}
                  <br />
                  <strong>Phone:</strong> {property.userId?.phone || "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminHome;
