// src/AdminPlane/AdminAllBooking.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { getAllAdminBookingPosts } from "../config/redux/action/adminDashboardAction";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";

const AdminAllBooking = () => {
  const dispatch = useDispatch();

  const {
    allBookings = [],
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(getAllAdminBookingPosts());

    return () => {
      dispatch(resetDashboardState());
    };
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading bookings...</p>
      </div>
    );

  if (isError) return <Alert variant="danger">❌ {message}</Alert>;

  if (isSuccess && allBookings.length === 0) {
    return (
      <Alert variant="info" className="mt-4 text-center">
        No bookings found for selected view.
      </Alert>
    );
  }

  return (
    <Row className="gy-4 mt-4">
      {allBookings.map((booking) => (
        <Col md={6} lg={4} key={booking._id}>
          <Card className="shadow-sm h-100">
            {booking.property?.image?.url ? (
              <Card.Img
                variant="top"
                src={booking.property.image.url}
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  height: "300px",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Image
              </div>
            )}
            <Card.Body>
              <h5>{booking.property?.title || "Deleted Property"}</h5>
              <p>
                📍 {booking.property?.location}, {booking.property?.city}
              </p>
              <p>💰 ₹{booking.property?.price}</p>
              <hr />
              <p>👤 Guest: {booking.user?.name}</p>
              <p>📞 {booking.user?.phone}</p>
              <p>✉️ {booking.user?.email}</p>
              <hr />
              <p>💳 Payment: {booking.paymentMethod}</p>
              <Badge
                bg={booking.paymentStatus === "paid" ? "success" : "warning"}
              >
                {booking.paymentStatus}
              </Badge>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AdminAllBooking;
