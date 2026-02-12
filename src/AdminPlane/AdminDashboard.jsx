
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
import { useLocation } from "react-router-dom";
import styles from "../adminStylesModule/adminDash.module.css"


const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState("all");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search");

  const dispatch = useDispatch();

  const { totalAmount, totalBooking } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(getTotalAmountPosts());
    dispatch(getTotalBookingPosts());
  }, [dispatch]);


  return (
    <div className={styles.adminDashboardWrapper}>
      <Container className={styles.adminDashboard}>
        {searchQuery && <GlobalSearch searchQuery={searchQuery} />}
        <h2 className={styles.pageTitle}>📊 Admin Booking Dashboard</h2>

        {/* Summary Cards */}
        <Row className={styles.summaryRow}>
          <Col>
            <Card className={styles.adminsummarycard}>
              <Card.Body>
                <h6 className={styles.summaryCardTitle}>💰 Total Revenue</h6>
                <h4 className={styles.adminrevenue}>₹{totalAmount.toLocaleString()}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className={styles.adminsummarycard}>
              <Card.Body>
                <h6 className={styles.summaryCardTitle}>📦 Total Bookings</h6>
                <h4 className={styles.adminbooking}>{totalBooking}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <CustomButtonTop onSelectView={setSelectedView} />

        {/* Conditional Views */}
        {selectedView === "all" && <AdminAllBooking />}
        {selectedView === "active" && <AdminActiveBooking />}
        {selectedView === "cancelled" && <AdminCancelBooking />}
        {selectedView === "upcoming" && <AdminUpcomingBooking />}
        {selectedView === "pastbooking" && <AdminPastBooking />}
      </Container>
    </div>
  );
};

export default AdminDashboard;
