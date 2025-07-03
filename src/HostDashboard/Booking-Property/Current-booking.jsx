import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Button,
} from "react-bootstrap";
import { showError, showInfo } from "../../utils/toastUtils";
import { getActiveBookingPosts } from "../../config/redux/action/bookingAction ";
import { resetBookingStatus } from "../../config/redux/reducer/bookingReducer";


const CurrentBooking = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const {
    activeBookings,
    isLoading,
    isError,
    isSuccess,
    message,
    totalBookings,
    totalRevenue,
    totalNights,
    page,
    totalPages,
  } = useSelector((state) => state.booking);

  // Fetch bookings on mount
  useEffect(() => {
    if (token) {
      dispatch(getActiveBookingPosts({ token }));
    }

    return () => {
      dispatch(resetBookingStatus());
    };
  }, [dispatch, token]);

  // Toasts for success/error/info
  useEffect(() => {
    if (isError && message) {
      showError(message);
    }

    if (isSuccess && activeBookings.length === 0) {
      showInfo("You have no active bookings right now.");
    }
  }, [isError, isSuccess, message, activeBookings]);

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">📅 Active Bookings</h3>

      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading bookings...</p>
        </div>
      )}

      {isSuccess && activeBookings.length > 0 && (
        <>
          {/* Summary Stats */}
          <Row className="mb-4 text-center">
            <Col md={4}>
              <h6>Total Bookings</h6>
              <Badge bg="primary" pill>{totalBookings}</Badge>
            </Col>
            <Col md={4}>
              <h6>Total Nights</h6>
              <Badge bg="success" pill>{totalNights}</Badge>
            </Col>
            <Col md={4}>
              <h6>Total Revenue</h6>
              <Badge bg="warning" pill>₹{totalRevenue}</Badge>
            </Col>
          </Row>

          {/* Booking Cards */}
          <Row>
            {activeBookings.map((booking) => (
              <Col md={6} lg={4} className="mb-4" key={booking._id}>
                <div style={{ position: "relative" }}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Img
                      variant="top"
                      src={booking.property.image?.url || "/images/no-image.jpg"}
                      alt={booking.property.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Badge
                      bg={
                        booking.bookingStatus === "confirmed"
                          ? "success"
                          : booking.bookingStatus === "pending"
                          ? "warning"
                          : "secondary"
                      }
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      {booking.bookingStatus.toUpperCase()}
                    </Badge>

                    <Card.Body>
                      <Card.Title className="text-truncate">
                        {booking.property.title}
                      </Card.Title>

                      <ListGroup variant="flush" className="small">
                        <ListGroup.Item>
                          <strong>Guest:</strong> {booking.user?.name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Contact:</strong>{" "}
                          {booking.user?.phone} / {booking.user?.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>City:</strong> {booking.property.city}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Check-In:</strong>{" "}
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Check-Out:</strong>{" "}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Total ₹:</strong> {booking.totalAmount}
                        </ListGroup.Item>
                      </ListGroup>

                      {/* Optional Host Actions */}
                      <div className="mt-3 d-flex justify-content-between">
                        <Button variant="outline-danger" size="sm">Cancel</Button>
                        <Button variant="outline-primary" size="sm">Message</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="text-center mt-4">
              <p>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </p>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default CurrentBooking;
