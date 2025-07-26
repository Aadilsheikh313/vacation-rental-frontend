import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Table,
  Card,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllActiveBookingPosts } from "../config/redux/action/adminDashboardAction";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    bookings,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminDashboard);


  // 🧠 Dummy Analytics Data (replace with real API later)
  const [analytics, setAnalytics] = useState({
    totalRevenue: 352000,
    totalBookings: 58,
    cancelledBookings: 7,
    activeProperties: 23,
  });

  useEffect(() => {
    dispatch(getAllActiveBookingPosts());

    return () => {
      dispatch(resetDashboardState());
    };
  }, [dispatch]);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">📊 Admin Booking Dashboard</h2>

      {/* 🔝 Top Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center shadow-sm bg-light">
            <Card.Body>
              <h6 className="text-muted">💰 Total Revenue</h6>
              <h4 className="text-success">₹{analytics.totalRevenue.toLocaleString()}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm bg-light">
            <Card.Body>
              <h6 className="text-muted">📦 Total Bookings</h6>
              <h4 className="text-primary">{analytics.totalBookings}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm bg-light">
            <Card.Body>
              <h6 className="text-muted">❌ Cancelled Bookings</h6>
              <h4 className="text-danger">{analytics.cancelledBookings}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm bg-light">
            <Card.Body>
              <h6 className="text-muted">🏠 Active Properties</h6>
              <h4 className="text-info">{analytics.activeProperties}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 🔄 Loading */}
      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading active bookings...</p>
        </div>
      )}

      {/* ❌ Error */}
      {isError && <Alert variant="danger">❌ {message}</Alert>}

      {/* ✅ Booking Cards */}
      {isSuccess && bookings.length > 0 && (
        <Row className="gy-4">
          {bookings.map((booking, index) => {
            const imageUrl = booking.property?.image?.url;
            console.log(`Image URL [${index}]:`, imageUrl);

            return (
              <Col md={6} lg={4} key={booking._id}>
                <Card className="shadow-sm h-100">
                  {booking.property?.image?.url ? (
                    <Card.Img
                      variant="top"
                      src={booking.property.image.url}
                      onError={(e) => {
                        e.target.onerror = null; // avoid infinite loop
                        e.target.src = "/adminregister.jpg"; // local fallback image
                      }}
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
                      <span>No Image Available</span>
                    </div>
                  )}


                  <Card.Body>
                    <h5 className="mb-2">{booking.property?.title || "Untitled Property"}</h5>
                    <p className="text-muted mb-1">
                      📍 {booking.property?.location || "-"}, {booking.property?.city || ""}
                    </p>
                    <p className="mb-1">💰 ₹{booking.property?.price?.toLocaleString()}</p>
                    <hr />
                    <p className="mb-1">👤 {booking.user?.name}</p>
                    <p className="mb-1">📞 {booking.user?.phone}</p>
                    <p className="mb-1">✉️ {booking.user?.email}</p>
                    <hr />
                    <p className="mb-1">💳 Payment Method: {booking.paymentDetails?.paymentMethod || "N/A"}</p>
                    <Badge
                      bg={booking.paymentStatus === "paid" ? "success" : "warning"}
                    >
                      {booking.paymentStatus}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* ℹ️ No Bookings */}
      {isSuccess && bookings.length === 0 && (
        <Alert variant="info">No active bookings found.</Alert>
      )}
    </Container>
  );
};

export default AdminDashboard;