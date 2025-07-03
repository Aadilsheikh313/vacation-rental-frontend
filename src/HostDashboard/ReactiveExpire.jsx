import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPropertiesPosts, reactivePropertyPosts } from "../config/redux/action/propertyAction";
import { Spinner, Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Expire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hostDashboardPosts, hostDashboardLoading, isError, message } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyPropertiesPosts());
  }, [dispatch]);

  const handleReactivate = (id) => {
    dispatch(reactivePropertyPosts({ id, token }));
  };

  const expiredPosts = hostDashboardPosts.filter((post) => post.expired === true);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">🔄 Expired Properties (Soft Deleted)</h2>

      {hostDashboardLoading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {isError && <Alert variant="danger">{message}</Alert>}

      {!hostDashboardLoading && expiredPosts.length === 0 && (
        <Alert variant="info">No expired properties found.</Alert>
        
      )}

      <Row>
        {expiredPosts.map((property) => (
          <Col md={4} key={property._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={property.image?.url} />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description?.slice(0, 100)}...</Card.Text>
                <Card.Text><strong>Price:</strong> ₹{property.price}</Card.Text>
                <Button variant="success" onClick={() => handleReactivate(property._id)}>
                  Reactivate
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => navigate("/host/dashboard")}>
          ← Back to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Expire;
