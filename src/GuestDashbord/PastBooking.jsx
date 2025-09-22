import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card } from "react-bootstrap";
import { GetGuestPastBookingPost } from "../config/redux/action/guestDashAction";
import styles from "../stylesModule/Booking/PastBooking.module.css";
import CustomSpinner from "../comman/Spinner";
import { IoBookOutline } from "react-icons/io5";
import { PiHandWaving } from "react-icons/pi";
import { FaEnvelope, FaPhone, FaStreetView, FaUser } from "react-icons/fa";

const PastBooking = () => {
  const dispatch = useDispatch();

  // Redux state
  const { PastBookings, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.guestDash
  );
  const { user } = useSelector((state) => state.auth);

  // On component mount -> fetch bookings
  useEffect(() => {
    dispatch(GetGuestPastBookingPost());
  }, [dispatch]);

  return (
    <div className={styles.PastBookingContainer}>
      {/* Heading */}
      <div className={styles.headingWrapper}>
        <h2 className={styles.HeadingPast}>
          <PiHandWaving /> Hello, <span className={styles.username}>{user?.name}</span>
        </h2>
        <p className={styles.subHeading}>
          Here’s a look at all your <strong>Past Bookings</strong> <IoBookOutline />
        </p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {/* Error */}
          {isError && (
            <Alert variant="danger">{message || "Something went wrong"}</Alert>
          )}

          {/* No Bookings */}
          {isSuccess && PastBookings?.length === 0 && (
            <Alert variant="info">
              <strong>Sorry {user?.name},</strong> No past bookings found 😕
            </Alert>
          )}

          {/* Total count */}
          <div className={styles.pastBookingcount}>
            <p>
              <strong>Total Past Bookings: </strong>
              {PastBookings?.length}
            </p>
          </div>

          {/* All Bookings */}
          <div className={styles.BookingCardContainer}>
            {PastBookings?.map((booking) => (
              <div className={styles.BookingsCard} key={booking._id}>
                <Card className={styles.CardBooking}>
                  <Card.Img className={styles.image}
                    variant="top"
                    src={booking.property?.image?.url || "/default.jpg"}
                  />
                  <Card.Body className={styles.CardBody}>
                    <Card.Title className={styles.CardTitle}>{booking.property?.title || "Property"}</Card.Title>
                    <Card.Text className={styles.CardText}>
                      <strong>City:</strong> {booking.property?.city} <br />
                      <strong>Check In:</strong>{" "}
                      {new Date(booking.checkIn).toLocaleDateString()} <br />
                      <strong>Check Out:</strong>{" "}
                      {new Date(booking.checkOut).toLocaleDateString()} <br />
                      <strong>Guests:</strong>{" "}
                      {booking.guests.adults} Adults, {booking.guests.children} Children,{" "}
                      {booking.guests.infants} Infants, {booking.guests.pets} Pets <br />
                      <strong>Price/Night:</strong> ₹{booking.pricePerNight} <br />
                      <strong>Nights:</strong> {booking.numberOfNights} <br />
                      <strong>Service Fee:</strong> ₹{booking.serviceFee} <br />
                      <strong>Taxes:</strong> ₹{booking.taxes} <br />
                      <strong>Total Amount:</strong> ₹{booking.totalAmount} <br />
                      <strong>Status:</strong> {booking.bookingStatus} <br />
                      <strong>Payment:</strong> {booking.paymentStatus} (
                      {booking.paymentMethod})
                    </Card.Text>
                    <p className={styles.HostInfo}>
                      <strong>Hosted By:</strong> <FaUser /> {booking.property?.userId?.name} <br />
                      <strong>Email:</strong> <FaEnvelope /> <a href={`mailto:${booking.property?.userId?.email}`} className={styles.HostLink}>{booking.property?.userId?.email}</a> <br />
                      <strong>Phone:</strong> <FaPhone /> <a href={`tel:${booking.property?.userId?.phone}`} className={styles.HostLink}>{booking.property?.userId?.phone}</a>
                    </p>

                    <Button variant="outline-primary">
                      <FaStreetView />More Details
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PastBooking;
