import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetGuestCurrentBookingPost } from "../config/redux/action/guestDashAction";
import { Card, Button, Alert } from "react-bootstrap";
import styles from '../stylesModule/Booking/CurrentBooking.module.css';
import CustomSpinner from "../comman/Spinner";
import { BsStars } from "react-icons/bs";
import { FaUmbrellaBeach, FaEnvelope, FaPhone, FaUser, FaStreetView } from "react-icons/fa";

const CurrentBooking = () => {
    const dispatch = useDispatch();
    const { CurrentBooking, isLoading, isError, isSuccess, message } = useSelector(state => state.guestDash);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(GetGuestCurrentBookingPost());
    }, [dispatch]);

    if (isLoading) return <CustomSpinner />;

    return (
        <div className={styles.CurrentBookingContainer}>
            <div className={styles.CurrHeading}>
                <h2 className={styles.headingTitle}>
                    <BsStars /> Welcome back, <span className={styles.username}>{user?.name}</span>!
                </h2>
                <p className={styles.subHeading}>
                    Here are your <strong>ongoing bookings</strong>. Enjoy your stay and make the most out of your journey <FaUmbrellaBeach />
                </p>
            </div>

            {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}
            {isSuccess && CurrentBooking?.length === 0 && (
                <Alert variant="info"><strong>Sorry {user?.name}</strong>, no current bookings found.</Alert>
            )}

            {CurrentBooking?.length > 0 && (
                <>
                    <div className={styles.currBookingcount}>
                        <p><strong>Active Bookings: </strong>{CurrentBooking.length}</p>
                    </div>
                    <div className={styles.BookingCardContainer}>
                        {CurrentBooking.map((booking) => (
                            <div className={styles.BookingsCard} key={booking._id}>
                                <Card className={styles.CardBooking}>
                                    <Card.Img 
                                        className={styles.image}
                                        variant="top" 
                                        src={booking.property?.image?.url || "/default.jpg"} 
                                        alt={booking.property?.title || "Property"} 
                                    />
                                    <Card.Body className={styles.CardBody}>
                                        <Card.Title className={styles.CardTitle}>
                                            {booking.property?.title || "Property"}
                                        </Card.Title>
                                        <Card.Text className={styles.CardText}>
                                            <strong>City:</strong> {booking.property?.city} <br />
                                            <strong>Check In:</strong> {new Date(booking.checkIn).toLocaleDateString()} <br />
                                            <strong>Check Out:</strong> {new Date(booking.checkOut).toLocaleDateString()} <br />
                                            <strong>Guests:</strong> {booking.guests.adults} Adults, {booking.guests.children} Children, {booking.guests.infants} Infants, {booking.guests.pets} Pets <br />
                                            <strong>Total Nights:</strong> {booking.numberOfNights} <br />
                                            <strong>Total Amount:</strong> ₹{booking.totalAmount} <br />
                                            <strong>Status:</strong> {booking.bookingStatus} <br />
                                            <strong>Payment Status:</strong> {booking.paymentStatus} ({booking.paymentMethod})
                                        </Card.Text>

                                        <p className={styles.HostInfo}>
                                            <strong>Hosted By:</strong> <FaUser /> {booking.property?.userId?.name} <br />
                                            <strong>Email:</strong> <FaEnvelope /> <a href={`mailto:${booking.property?.userId?.email}`} className={styles.HostLink}>{booking.property?.userId?.email}</a> <br />
                                            <strong>Phone:</strong> <FaPhone /> <a href={`tel:${booking.property?.userId?.phone}`} className={styles.HostLink}>{booking.property?.userId?.phone}</a>
                                        </p>

                                        <Button variant="outline-primary">
                                            <FaStreetView /> More Details
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
}

export default CurrentBooking;
