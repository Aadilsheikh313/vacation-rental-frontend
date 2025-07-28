
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomButtonTop from "./CustomButtonTop";
import AdminActiveBooking from "./AdminActivebooking";
import AdminAllBooking from "./AdminAllBooking"; 
import AdminCancelBooking from "./AdminCancelbooking";
import AdminUpcomingBooking from "./AdminUpcomingBooking";
import AdminPastBooking from "./AdminPastBooking";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotalAmountPosts, getTotalBookingPosts } from "../config/redux/action/adminDashboardAction";


const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState("all");

  const dispatch = useDispatch();

const { totalAmount, totalBooking } = useSelector((state) => state.adminDashboard);

useEffect(() => {
  dispatch(getTotalAmountPosts());
  dispatch(getTotalBookingPosts());
}, [dispatch]);


  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">📊 Admin Booking Dashboard</h2>

      {/* Summary Cards */}
      <Row className="mb-4">
  <Col>
    <Card className="text-center shadow-sm bg-light">
      <Card.Body>
        <h6 className="text-muted">💰 Total Revenue</h6>
        <h4 className="text-success">₹{totalAmount.toLocaleString()}</h4>
      </Card.Body>
    </Card>
  </Col>
  <Col>
    <Card className="text-center shadow-sm bg-light">
      <Card.Body>
        <h6 className="text-muted">📦 Total Bookings</h6>
        <h4 className="text-primary">{totalBooking}</h4>
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
      {selectedView === "pastbooking" && <AdminPastBooking/>}
    </Container>
  );
};

export default AdminDashboard;
