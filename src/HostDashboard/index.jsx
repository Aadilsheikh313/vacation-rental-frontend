import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPropertiesPosts, harddeletePropertyPosts, softdeletePropertyPosts } from '../config/redux/action/propertyAction';
import { resethostDashboardPosts } from '../config/redux/reducer/propertyReducer';
import { Spinner, Card, Button, Container, Row, Col, Alert, NavItem } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { confirmDelete } from "../utils/confirmDelete";
import styles from "../stylesModule/host.module.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";



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
{!hostDashboardLoading && hostDashboardPosts.length === 0 && (
  <Alert variant="info">
    {message || "You haven't posted any properties yet."}
  </Alert>
)}

  return (
    <Container className={styles.Container}>
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
            <Card className={styles.propertyCard}>
              <Card.Img
                variant="top"
                src={property.image?.url || "https://via.placeholder.com/300x200"}
                className={styles.cardImage}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>{property.title}</Card.Title>
                <Card.Text className={styles.cardText}>
                  {property.description?.slice(0, 100)}...
                </Card.Text>
                <Card.Text className={styles.priceText}>
                  ₹{property.price}
                </Card.Text>

                <div className={styles.buttonGroup}>
                  <Button
                    as={Link}
                    to={`/property/${property._id}`}
                    className={`${styles.cardButton} ${styles.viewBtn}`}
                  >
                  <FaEye/>  View
                  </Button>

                  <Button
                    onClick={() => navigate(`/edit/${property._id}`)}
                    className={`${styles.cardButton} ${styles.editBtn}`}
                  >
                   <FaEdit/> Edit
                  </Button>

                  <Button
                    onClick={() => hardhandleDelete(property._id)}
                    className={`${styles.cardButton} ${styles.deleteBtn}`}
                  >
                    <FaTrash/>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HostDashboard;
