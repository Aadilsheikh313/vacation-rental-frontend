import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card, Modal } from "react-bootstrap";
import { GetGuestPastBookingPost } from "../config/redux/action/guestDashAction";
import styles from "../stylesModule/Booking/PastBooking.module.css";
import CustomSpinner from "../comman/Spinner";
import { IoBookOutline } from "react-icons/io5";
import { PiHandWaving } from "react-icons/pi";
import { FaEnvelope, FaPhone, FaStreetView, FaUser } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { useState } from "react";
import ReviewForm from "../Review/ReviewForm";
import { resetReviewStatus } from "../config/redux/reducer/reviewReducer";

const PastBooking = () => {
  const dispatch = useDispatch();

  // Redux state
  const { PastBookings, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.guestDash
  );
  const { user } = useSelector((state) => state.auth);
  const { alreadyReviewed , reviewPosts} = useSelector((state) => state.review);


  const [showReview, setShowReview] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [show, setShow] = useState(false);


  const handleReviewClick = (propertyId) => {
  const alreadyReviewedByUser = reviewPosts?.some(
    (review) =>
      review.property === propertyId &&
      review.user === user?._id
  );

  if (alreadyReviewedByUser) {
    setShow(true); // ✅ Already Reviewed Modal
  } else {
    setSelectedPropertyId(propertyId);
    setShowReview(true); // ✅ Write Review Modal
  }
};


  const handleCloseReview = () => {
    setShowReview(false);
    setSelectedPropertyId(null);
  };

  // On component mount -> fetch bookings
  useEffect(() => {
    dispatch(GetGuestPastBookingPost());
  }, [dispatch]);

  useEffect(() => {
    if (alreadyReviewed) {
      setShow(true); // ✅ OPEN MODAL
    }
  }, [alreadyReviewed]);

  const handleClose = () => {
    setShow(false);
    dispatch(resetReviewStatus());
  };



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
                    <div className={styles.BTN}>
                      <Button variant="outline-primary">
                        <FaStreetView />More Details
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleReviewClick(booking.property?._id)}
                      >
                        <IoMdStarOutline /> Review
                      </Button>

                    </div>

                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <Modal
            show={showReview}
            onHide={handleCloseReview}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Write a Review</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedPropertyId && (
                <ReviewForm propertyId={selectedPropertyId}
                  onClose={handleCloseReview} />
              )}
            </Modal.Body>
          </Modal>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Review Already Submitted</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              You have already posted a review for this property.
              <br />
              You can edit your review from the review section.
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Go to My Review
              </Button>
            </Modal.Footer>
          </Modal>


        </>
      )}
    </div>
  );
};

export default PastBooking;
