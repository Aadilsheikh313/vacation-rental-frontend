import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminBookingPosts } from "../config/redux/action/adminDashboardAction";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";
import CustomButtonTop from "./CustomButtonTop";
import AdminActiveBooking from "./AdminActivebooking";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    allBookings = [],
    activeBookings = [],
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminDashboard);

  const [analytics, setAnalytics] = useState({
    totalRevenue: 352000,
    totalBookings: 58,
    cancelledBookings: 7,
    activeProperties: 23,
  });

  const [selectedView, setSelectedView] = useState("all");

  useEffect(() => {
    dispatch(getAllAdminBookingPosts());

    return () => {
      dispatch(resetDashboardState());
    };
  }, [dispatch]);

  // Dynamic bookings based on selectedView
  const displayedBookings = selectedView === "all"
    ? allBookings
    : selectedView === "active"
    ? activeBookings
    : []; // Future: add `cancelledBookings`, `upcomingBookings` here

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">📊 Admin Booking Dashboard</h2>

      {/* Summary Cards */}
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

      <CustomButtonTop onSelectView={setSelectedView} />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading bookings...</p>
        </div>
      )}

      {/* Error Alert */}
      {isError && <Alert variant="danger">❌ {message}</Alert>}

      {/* Main Content */}
      {isSuccess && displayedBookings.length > 0 && selectedView === "all" && (
        <Row className="gy-4">
          {displayedBookings.map((booking) => (
            <Col md={6} lg={4} key={booking._id}>
              <Card className="shadow-sm h-100">
                {booking.property?.image?.url ? (
                  <Card.Img
                    variant="top"
                    src={booking.property.image.url}
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{
                    height: "300px",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    No Image
                  </div>
                )}
                <Card.Body>
                  <h5>{booking.property?.title || "Deleted Property"}</h5>
                  <p>📍 {booking.property?.location}, {booking.property?.city}</p>
                  <p>💰 ₹{booking.property?.price}</p>
                  <hr />
                  <p>👤 Guest: {booking.user?.name}</p>
                  <p>📞 {booking.user?.phone}</p>
                  <p>✉️ {booking.user?.email}</p>
                  <hr />
                  <p>💳 Payment: {booking.paymentMethod}</p>
                  <Badge bg={booking.paymentStatus === "paid" ? "success" : "warning"}>
                    {booking.paymentStatus}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Active View */}
      {selectedView === "active" && <AdminActiveBooking />}

      {/* No Data Message */}
      {isSuccess && displayedBookings.length === 0 && (
        <Alert variant="info" className="mt-4 text-center">
          No bookings found for selected view.
        </Alert>
      )}
    </Container>
  );
};

export default AdminDashboard;
