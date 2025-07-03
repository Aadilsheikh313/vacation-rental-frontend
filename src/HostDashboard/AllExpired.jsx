import React, { useEffect } from "react";
import { Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyExpiredPropertyPosts } from "../config/redux/action/propertyAction";

const AllExpired = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, isError, message, isLoading } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyExpiredPropertyPosts({ token }));
  }, [dispatch, token]);

  const allexpiredPosts = posts?.filter((post) => post.expired === true) || [];

  return (
    <Container>
      <h1 className="text-center mb-4">Show All Expired Properties</h1>

      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {isError && <Alert variant="danger">{message}</Alert>}

      {!isLoading && allexpiredPosts.length === 0 && (
        <Alert variant="info">No expired properties found.</Alert>
      )}

      <Row>
        {allexpiredPosts.map((property) => (
          <Col md={4} key={property._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={property.image?.url || "https://via.placeholder.com/300x200"} />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description?.slice(0, 100)}...</Card.Text>
                <Card.Text><strong>Price:</strong> ₹{property.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => navigate("/host/dashboard")} className="me-2">
          ← Back to Dashboard
        </Button>
        <Button variant="primary" onClick={() => navigate("/host/expired-properties")}>
          Go to Reactive Property
        </Button>
      </div>
    </Container>
  );
};

export default AllExpired;
