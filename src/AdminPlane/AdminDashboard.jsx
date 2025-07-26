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

      {/* ✅ Booking Table */}
      {isSuccess && bookings.length > 0 && (
        <Card className="shadow-sm">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>{booking.property?.title || "-"}</td>
                    <td>
                      {booking.property?.location || "-"},{" "}
                      {booking.property?.city}
                    </td>
                    <td>₹{booking.property?.price?.toLocaleString()}</td>
                    <td>{booking.user?.name}</td>
                    <td>{booking.user?.phone}</td>
                    <td>{booking.user?.email}</td>
                    <td>{booking.paymentDetails?.paymentMethod || "N/A"}</td>
                    <td>
                      <Badge
                        bg={
                          booking.paymentStatus === "paid"
                            ? "success"
                            : "warning"
                        }
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* ℹ️ No Bookings */}
      {isSuccess && bookings.length === 0 && (
        <Alert variant="info">No active bookings found.</Alert>
      )}
    </Container>
  );
};

export default AdminDashboard;
