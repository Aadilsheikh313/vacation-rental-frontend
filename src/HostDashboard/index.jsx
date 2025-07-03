import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPropertiesPosts, harddeletePropertyPosts, softdeletePropertyPosts } from '../config/redux/action/propertyAction';
import { resethostDashboardPosts } from '../config/redux/reducer/propertyReducer';
import { Spinner, Card, Button, Container, Row, Col, Alert, NavItem } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { confirmDelete } from "../utils/confirmDelete";

const HostDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    hostDashboardPosts,
    hostDashboardLoading,
    isError,
    message,
  } = useSelector((state) => state.post);

  const { token } = useSelector((state) => state.auth); // ✅ Added

  useEffect(() => {
    dispatch(getMyPropertiesPosts());

    return () => {
      dispatch(resethostDashboardPosts());
    };
  }, [dispatch]);
  const showAllProperties = () => {
    dispatch(getMyPropertiesPosts());
  }
  const showSoftDeletedProperties = () => {
    dispatch(softdeletePropertyPosts());
  };

  const showHardDeletedProperties = () => {
    dispatch(harddeletePropertyPosts());
  };

  // ✅ Pass ID dynamically per card
  const hardhandleDelete = (propertyId) => {
    confirmDelete({
      id: propertyId,
      token,
      dispatch,
      deleteAction: harddeletePropertyPosts,
      navigate,
      successRedirectTo: "/host/dashboard",
    });
  };

  return (
    <Container className="py-4">
      <NavItem>
        <Row className="mb-4 text-center">
          <Col>
            <Button variant="primary" onClick={showAllProperties}>All Properties</Button>
          </Col>
          <Col>
            <Button variant="warning" onClick={() => navigate("/host/all-expired-property")}>Expired Soft Deleted Properties</Button>
          </Col>

          <Col>
            <Button
              variant="secondary"
              onClick={() => navigate("/host/expired-properties")}
            >
              Expired True Property
            </Button>

          </Col>
        </Row>

      </NavItem>
      <h2 className="text-center mb-4">🏠 Host Dashboard</h2>

      {hostDashboardLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {isError && <Alert variant="danger">{message}</Alert>}

      {!hostDashboardLoading && hostDashboardPosts.length === 0 && (
        <Alert variant="info">You haven't posted any properties yet.</Alert>
      )}

      <Row>
        {hostDashboardPosts.map((property) => (
          <Col md={4} key={property._id} className="mb-4">
            <Card>
              
              <Card.Img variant="top" src={property.image?.url || "https://via.placeholder.com/300x200"} />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description?.slice(0, 100)}...</Card.Text>
                <Card.Text><strong>Price:</strong> ₹{property.price}</Card.Text>
                <Link to={`/property/${property._id}`}>
                  <Button variant="info" className="me-2">View</Button>
                </Link>
                <Button
                  onClick={() => navigate(`/edit/${property._id}`)}
                  variant="warning"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => hardhandleDelete(property._id)} // ✅ Proper call
                  variant="danger"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HostDashboard;
