import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Card, Row, Col, Badge } from "react-bootstrap";
import { getBookingPropertyPosts, getPastandCancelledBookingPosts } from "../config/redux/action/bookingAction ";


const GuestDashboard = () => {
  const dispatch = useDispatch();

  const {
    bookings,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.booking);

  // Fetch bookings on mount
  useEffect(() => {
    dispatch(getBookingPropertyPosts());
    dispatch(getPastandCancelledBookingPosts({ token: localStorage.getItem("token") }));
  }, [dispatch]);


  // Separate bookings
  const upcomingBookings = bookings?.filter(
    (b) =>
      b.bookingStatus !== "cancelled" &&
      new Date(b.checkOut) >= new Date()
  );

  const pastOrCancelledBookings = bookings?.filter(
    (b) =>
      b.bookingStatus === "cancelled" ||
      new Date(b.checkOut) < new Date()
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Your Bookings</h2>

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading bookings...</p>
        </div>
      ) : isError ? (
        <p className="text-danger text-center">{message}</p>
      ) : (
        <>
          {/* 🔹 Upcoming Bookings */}
          <section className="mb-5">
            <h4>Upcoming Bookings</h4>
            {upcomingBookings.length === 0 ? (
              <p className="text-muted">No upcoming bookings.</p>
            ) : (
              <Row>
                {upcomingBookings.map((booking) => (
                  <Col md={6} lg={4} key={booking._id} className="mb-3">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={booking.property?.image?.url || "/default.jpg"}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{booking.property?.title}</Card.Title>
                        <p className="mb-1">
                          <strong>City:</strong> {booking.property?.city}
                        </p>
                        <p className="mb-1">
                          <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                        </p>
                        <p className="mb-1">
                          <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                        <Badge bg="success">{booking.bookingStatus}</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </section>

          {/* 🔹 Past or Cancelled */}
          <section>
            <h4>Past or Cancelled Bookings</h4>
            {pastOrCancelledBookings.length === 0 ? (
              <p className="text-muted">No past or cancelled bookings.</p>
            ) : (
              <Row>
                {pastOrCancelledBookings.map((booking) => (
                  <Col md={6} lg={4} key={booking._id} className="mb-3">
                    <Card border={booking.bookingStatus === "cancelled" ? "danger" : "secondary"}>
                      <Card.Img
                        variant="top"
                        src={booking.property?.image || "/default.jpg"}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{booking.property?.title}</Card.Title>
                        <p className="mb-1">
                          <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                        </p>
                        <p className="mb-1">
                          <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                        <Badge bg={booking.bookingStatus === "cancelled" ? "danger" : "secondary"}>
                          {booking.bookingStatus}
                        </Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default GuestDashboard;
