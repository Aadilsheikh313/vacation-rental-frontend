import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card } from "react-bootstrap";
import { GetGuestPastBookingPost } from "../config/redux/action/guestDashAction";
import styles from '../stylesModule/Booking/PastBooking.module.css'
import CustomSpinner from "../comman/Spinner";
import { IoBookOutline } from "react-icons/io5";
import { PiHandWaving } from "react-icons/pi";

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
      <div className={styles.headingWrapper}>
        <h2 className={styles.HeadingPast}>
          <PiHandWaving /> Hello, <span className={styles.username}>{user?.name}</span>
        </h2>
        <p className={styles.subHeading}>
          Here’s a look at all your <strong>Past Bookings</strong> <IoBookOutline />
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {/* Error State */}
          {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}

          {/* Success but no bookings */}
          {isSuccess && PastBookings?.length === 0 && (
            <Alert variant="info"><strong>Sorry {user?.name}</strong>No past bookings found</Alert>
          )}
          <div className={styles.pastBookingcount}>
             <p><strong>Total Past booking = </strong>{PastBookings?.length}</p>
          </div>

          {/* Show bookings */}
          <div className={styles.BookingCardContainer}>
            {PastBookings?.map((booking) => (
              <div className={styles.BookingsCard} key={booking._id}>
                <Card>
                  <Card.Body>
                    <Card.Img variant="top" src={booking.property?.image?.url || "/default.jpg"} />
                    <Card.Title>{booking.property?.title || "Property"}</Card.Title>
                    <Card.Text>
                      <strong>Check In:</strong>{" "}
                      {new Date(booking.checkIn).toLocaleDateString()} <br />
                      <strong>Check Out:</strong>{" "}
                      {new Date(booking.checkOut).toLocaleDateString()} <br />
                      <strong>Status:</strong> {booking.bookingStatus}
                    </Card.Text>
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
