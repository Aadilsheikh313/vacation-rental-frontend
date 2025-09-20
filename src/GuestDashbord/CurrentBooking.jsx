import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from '../stylesModule/Booking/CurrentBooking.module.css'
import { useDispatch, useSelector } from "react-redux";
import { GetGuestCurrentBookingPost } from "../config/redux/action/guestDashAction";
import CustomSpinner from "../comman/Spinner";
import { Alert } from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import { FaUmbrellaBeach } from "react-icons/fa";

const CurrentBooking = () => {
    const dispatch = useDispatch();

    // Redux state
    const { CurrentBooking, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.guestDash
    );
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(GetGuestCurrentBookingPost());
    }, [dispatch]);

    return (
        <div className={styles.CurrentBookingContainer}>
            <div className={styles.CurrHeading}>
                <h2 className={styles.headingTitle}>
                    <BsStars /> Welcome back, <span className={styles.username}>{user?.name}</span>!
                </h2>
                <p className={styles.subHeading}>
                    Here are your <strong>ongoing bookings</strong>.
                    Enjoy your stay and make the most out of your journey <FaUmbrellaBeach />
                </p>
            </div>
            {isLoading ? (
                <CustomSpinner />
            ) : (
                <>
                    {/* Error State */}
                    {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}

                    {/* Success but no bookings */}
                    {isSuccess && CurrentBooking?.length === 0 && (
                        <Alert variant="info"><strong>Sorry {user?.name}</strong>No past bookings found</Alert>
                    )}
                    <div className={styles.pastBookingcount}>
                        <p>
                            <strong>Active Bookings: </strong>
                            {CurrentBooking?.length}
                        </p>
                    </div>
                    <div className={styles.CardDiv}>
                        {CurrentBooking?.map((booking) => (
                            <div className={styles.BookingsCard} key={booking._id}>
                                <Card className={styles.CurrentBookingCard}>
                                    <Card.Img variant="top" src={booking.property?.image?.url || "/default.jpg"} />
                                    <Card.Body>
                                        <Card.Title>{booking.property?.title || "Property"}</Card.Title>
                                        <Card.Text>
                                            <strong>Check In:</strong>{" "}
                                            {new Date(booking.checkIn).toLocaleDateString()} <br />
                                            <strong>Check Out:</strong>{" "}
                                            {new Date(booking.checkOut).toLocaleDateString()} <br />
                                            <strong>Status:</strong> {booking.bookingStatus}
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}

                    </div>

                </>
            )}

        </div>
    )
}

export default CurrentBooking;