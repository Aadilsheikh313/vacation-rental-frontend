import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Badge
} from "react-bootstrap";
import moment from "moment";
import { getHostBookingHistoryPosts } from "../../config/redux/action/bookingAction ";
import styles from "../../stylesModule/history.module.css";


const BookingHistory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const {
    historyBookings,
    isLoading,
    isError,
    message,
    totalBookings,
    totalRevenue,
    totalNights,
  } = useSelector((state) => state.booking);

  useEffect(() => {
    if (token) {
      dispatch(getHostBookingHistoryPosts({ token }));
    }
  }, [dispatch, token]);

  return (
    <Container className={styles.bookingHistoryContainer}>
      <h2 className={styles.title}>📜 Your Property Booking History</h2>

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading booking history...</p>
        </div>
      ) : isError ? (
        <p className="text-danger">{message}</p>
      ) : !historyBookings || historyBookings.length === 0 ? (
        <p className="text-muted">No booking history found.</p>
      ) : (
        <>
          <Row className={styles.summaryRow}>
            <div>Total Bookings: {totalBookings}</div>
            <div>Total Nights: {totalNights}</div>
            <div>Total Revenue: ₹{totalRevenue}</div>
          </Row>

          <Row>
            {historyBookings.filter((p) => p.bookings.length > 0).map((property) => (
              <Col key={property.propertyId} xs={12} sm={6} lg={4} className="mb-4">
                <Card className={styles.propertyCard}>
                  <Card.Img
                    variant="top"
                    src={property.image?.url || "/default.jpg"}
                    className={styles.propertyImage}
                  />
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>{property.title}</Card.Title>
                    <p className={styles.propertyCity}><strong>City:</strong> {property.city}</p>


                    {property.bookings.map((booking) => (
                      <div key={booking._id} className={styles.bookingDetail}>
                        <p><strong>Guest:</strong> {booking.user?.name}</p>
                        <p><strong>Email:</strong> {booking.user?.email}</p>
                        <p><strong>Phone:</strong> {booking.user?.phone}</p>
                        <p><strong>Check-in:</strong> {moment(booking.checkIn).format("LL")}</p>
                        <p><strong>Check-out:</strong> {moment(booking.checkOut).format("LL")}</p>
                        <p>
                          <strong>Status:</strong>{" "}
                          <Badge
                            bg={booking.bookingStatus === "cancelled" ? "danger" : "success"}
                            className={styles.statusBadge}
                          >
                            {booking.bookingStatus}
                          </Badge>
                        </p>
                        {booking.review && (
                          <div className={styles.reviewSection}>
                            <strong>Review:</strong> {booking.review.comment} ⭐{booking.review.rating}/5
                          </div>
                        )}
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default BookingHistory;
