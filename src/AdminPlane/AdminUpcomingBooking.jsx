import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Container, Row, Col, Badge } from "react-bootstrap";
import { getAdminAllUpcomingBookingPosts } from "../config/redux/action/adminDashboardAction";
import styles from "../adminStylesModule/adminupcomming.module.css";
import CustomSpinner from "../comman/Spinner";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaMoneyBillWave,
  FaBed
} from "react-icons/fa";


const AdminUpcomingBooking = () => {
  const dispatch = useDispatch();

  const {
    upcomingBookings,
    totalUpcomingAmount,
    totalUpcomingCount,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(getAdminAllUpcomingBookingPosts());
  }, [dispatch]);

  return (
    <div className={styles.upcomingBookingWrapper}>
      <Container className={styles.upcomingBookingContainer}>
        <h3 className={styles.upcomingBookingHeading}>📅 Upcoming Booking Properties</h3>

        {isLoading && (
          <div >
            <CustomSpinner />
          </div>
        )}

        {isError && <Alert variant="danger">{message}</Alert>}

        {!isLoading && !isError && (
          <>
            <Card className={styles.summaryCard}>
              <Card.Body>
                <h5 className={styles.summaryCardHeading}>Total Upcoming Bookings: {totalUpcomingCount}</h5>
                <h6 className={styles.summaryCardSubheading}>
                  Total Revenue (Upcoming): ₹{totalUpcomingAmount.toLocaleString()}
                </h6>
              </Card.Body>
            </Card>

            {upcomingBookings.length === 0 ? (
              <Alert variant="info" className="text-center mt-4">
                No upcoming bookings found.
              </Alert>
            ) : (
              <Row className={styles.bookingRow}>
                {upcomingBookings.map((booking, idx) => (
                  <Col md={6} lg={4} key={booking.bookingId || idx}>
                    <Card className={styles.bookingCard}>
                      <Card.Img
                        variant="top"
                        src={booking.property?.image?.url || "/default-property.jpg"}
                        className={styles.bookingImage}
                      />
                      <Card.Body>
                        <h5 className={styles.propertyTitle}>
                          <FaHome /> {booking.property?.title || "No Title"}
                        </h5>

                        <p className={styles.propertyLocation}>
                          <FaMapMarkerAlt /> {booking.property?.location}, {booking.property?.city}
                        </p>

                        <p className={styles.price}>
                          <FaRupeeSign /> {booking.property?.price}/night
                        </p>

                        <hr />
                        <h6 className={styles.sectionTitle}><FaCalendarAlt /> Booking Dates</h6>
                        <p>Check-in: {new Date(booking.bookingDates.checkIn).toLocaleDateString()}</p>
                        <p>Check-out: {new Date(booking.bookingDates.checkOut).toLocaleDateString()}</p>
                        <p><FaBed /> Nights: {booking.bookingDates.nights}</p>

                        <hr />
                        <h6 className={styles.sectionTitle}>👤 Guest Info</h6>
                        <h6 className={styles.sectionTitle}><FaUser /> Guest Info</h6>
                        <p><FaUser /> {booking.guest?.name}</p>
                        <p><FaPhoneAlt /> {booking.guest?.phone}</p>
                        <p><FaEnvelope /> {booking.guest?.email}</p>

                        <hr />

                        <h6 className={styles.sectionTitle}><FaHome /> Host Info</h6>
                        <p><FaUser /> {booking.host?.name}</p>
                        <p><FaPhoneAlt /> {booking.host?.phone}</p>
                        <p><FaEnvelope /> {booking.host?.email}</p>

                        <hr />
                        <p className={styles.payment}>
                          <FaMoneyBillWave /> {booking.paymentDetails?.method || "N/A"}
                        </p>
                        <p>💰 Amount: ₹{booking.property?.totalAmount}</p>
                        <Badge
                          bg={booking.paymentDetails?.status === "Paid" ? "success" : "warning"}
                          className={styles.statusBadge}
                        >
                          {booking.paymentDetails?.status || "Pending"}
                        </Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default AdminUpcomingBooking;
