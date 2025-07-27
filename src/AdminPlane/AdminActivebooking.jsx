
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { getAllAdminActiveBookingPosts } from "../config/redux/action/adminDashboardAction";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";

const AdminActiveBooking = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminDashboard
  );

  useEffect(() => {
    dispatch(getAllAdminActiveBookingPosts());
    return () => dispatch(resetDashboardState());
  }, [dispatch]);

  if (isLoading) return <Spinner animation="border" className="mx-auto d-block my-4" />;
  if (isError) return <Alert variant="danger">{message}</Alert>;

  return (
    <>
      <h4 className="text-center mb-3">🟢 Active Booking Properties</h4>
      {bookings.length === 0 ? (
        <Alert variant="info">No active bookings found.</Alert>
      ) : (
        <Row className="gy-4">
          {bookings.map((booking) => (
            <Col md={6} lg={4} key={booking.bookingId}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5>{booking.property?.title}</h5>
                  <p>📍 {booking.property?.location}, {booking.property?.city}</p>
                  <p>💰 ₹{booking.property?.price}</p>
                  <hr />
                  <p>👤 Guest: {booking.guest?.name}</p>
                  <p>📞 {booking.guest?.phone}</p>
                  <p>✉️ {booking.guest?.email}</p>
                  <p>🏠 Host: {booking.host?.name}</p>
                  <hr />
                  <p>💳 Payment Method: {booking.paymentMethod}</p>
                  <Badge bg={booking.paymentStatus === "paid" ? "success" : "warning"}>
                    {booking.paymentStatus}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AdminActiveBooking;
