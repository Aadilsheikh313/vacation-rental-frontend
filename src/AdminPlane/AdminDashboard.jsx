
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomButtonTop from "./CustomButtonTop";
import AdminActiveBooking from "./AdminActivebooking";
import AdminAllBooking from "./AdminAllBooking"; 
import AdminCancelBooking from "./AdminCancelbooking";
import AdminUpcomingBooking from "./AdminUpcomingBooking";

const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState("all");

  const [analytics, setAnalytics] = useState({
    totalRevenue: 352000,
    totalBookings: 58,
    cancelledBookings: 7,
    activeProperties: 23,
  });

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">📊 Admin Booking Dashboard</h2>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col >
          <Card className="text-center shadow-sm bg-light">
            <Card.Body>
              <h6 className="text-muted">💰 Total Revenue</h6>
              <h4 className="text-success">
                ₹{analytics.totalRevenue.toLocaleString()}
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col >
          <Card className="text-center shadow-sm bg-light">
            <Card.Body>
              <h6 className="text-muted">📦 Total Bookings</h6>
              <h4 className="text-primary">{analytics.totalBookings}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <CustomButtonTop onSelectView={setSelectedView} />

      {/* Conditional Views */}
      {selectedView === "all" && <AdminAllBooking />}
      {selectedView === "active" && <AdminActiveBooking />}
      {selectedView === "cancelled" && <AdminCancelBooking/>}
      {selectedView === "upcoming" && <AdminUpcomingBooking/>}
    </Container>
  );
};

export default AdminDashboard;
