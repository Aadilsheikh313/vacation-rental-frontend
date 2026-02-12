// src/AdminPlane/AdminAllBooking.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { getAllAdminBookingPosts } from "../config/redux/action/adminDashboardAction";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";
import styles from "../adminStylesModule/adminallbooking.module.css";
import CustomSpinner from "../comman/Spinner";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";


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
      <div className={styles.loadingContainer}>
        <CustomSpinner />
        <p className={styles.loadingText}>Loading bookings...</p>
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
    <div className={styles.AdminAllBookingConatiner}>
      <Row className={styles.rowbookingcard}>
        {allBookings.map((booking) => (
          <Col md={6} lg={4} key={booking._id}>
            <Card className={styles.bookingcard}>
              {booking.property?.image?.url ? (
                <Card.Img
                  className={styles.imagecard}
                  variant="top"
                  src={booking.property.image.url}
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
              <Card.Body className={styles.cardBody}>
                <h5 className={styles.propertyTitle}>
                  <FaHome /> {booking.property?.title || "Deleted Property"}
                </h5>

                <p className={styles.location}>
                  <FaMapMarkerAlt /> {booking.property?.location},{" "}
                  {booking.property?.city}
                </p>

                <p className={styles.price}>
                  <FaMoneyBillWave /> ₹{booking.property?.price}
                </p>

                <div className={styles.divider}></div>

                <p className={styles.infoRow}>
                  <FaUser /> <span>{booking.user?.name}</span>
                </p>

                <p className={styles.infoRow}>
                  <FaPhoneAlt /> <span>{booking.user?.phone}</span>
                </p>

                <p className={styles.infoRow}>
                  <FaEnvelope /> <span>{booking.user?.email}</span>
                </p>

                <div className={styles.divider}></div>

                <p className={styles.paymentRow}>
                  <MdPayments /> {booking.paymentMethod}
                </p>

                <Badge
                  className={styles.statusBadge}
                  bg={booking.paymentStatus === "paid" ? "success" : "warning"}
                >
                  {booking.paymentStatus}
                </Badge>
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminAllBooking;
