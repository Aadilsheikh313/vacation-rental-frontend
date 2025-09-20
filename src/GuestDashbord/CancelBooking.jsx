import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetGuestCancelBookingPost } from "../config/redux/action/guestDashAction";
import { Card, Button, Alert } from "react-bootstrap";
import CustomSpinner from "../comman/Spinner";
import styles from '../stylesModule/Booking/CardCancelBooking.module.css';
import { MdCancel, MdOutlineTravelExplore } from "react-icons/md";

const CancelBooking = () => {
    const dispatch = useDispatch();
    const { CancelBooking, isLoading, isError, isSuccess, message } = useSelector(state => state.guestDash);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(GetGuestCancelBookingPost());
    }, [dispatch]);

    if (isLoading) return <CustomSpinner />;

    return (
        <div className={styles.CancelBookingConatiner}>
            <div className={styles.uppertext}>
                <h2 className={styles.headingTitle}>
                    <MdCancel className={styles.icon} /> Cancelled trips for{" "}
                    <span className={styles.username}>{user?.name}</span>
                </h2>
                <p className={styles.subHeading}>
                    Sometimes plans change, and that’s okay 💙.
                    Here you can find the trips you had to cancel.
                    Don’t worry, <MdOutlineTravelExplore className={styles.icon} /> new adventures are waiting for you! ✈️✨
                </p>
            </div>

            {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}

            {isSuccess && CancelBooking?.length === 0 && (
                <Alert variant="info"><strong>Sorry {user?.name}</strong>, no cancelled bookings found.</Alert>
            )}

            {CancelBooking?.length > 0 && (
                <>
                    <div className={styles.pastBookingcount}>
                        <p><strong>Total Cancelled Bookings: </strong>{CancelBooking.length}</p>
                    </div>
                    <div className={styles.cardConatiner}>
                        {CancelBooking.map((booking) => (
                            <div className={styles.Carddata} key={booking._id}>
                                <Card className={styles.CurrentBookingCard}>
                                    <Card.Img variant="top" src={booking.property?.image?.url || "/default.jpg"} />
                                    <Card.Body>
                                        <Card.Title>{booking.property?.title || "Property"}</Card.Title>
                                        <Card.Text>
                                            <strong>City:</strong> {booking.property?.city} <br />
                                            <strong>Guests:</strong> {booking.guests.adults} Adults, {booking.guests.children} Children, {booking.guests.infants} Infants, {booking.guests.pets} Pets <br />
                                            <strong>Check In:</strong> {new Date(booking.checkIn).toLocaleDateString()} <br />
                                            <strong>Check Out:</strong> {new Date(booking.checkOut).toLocaleDateString()} <br />
                                            <strong>Total Nights:</strong> {booking.numberOfNights} <br />
                                            <strong>Total Amount:</strong> ₹{booking.totalAmount} <br />
                                            <strong>Payment Status:</strong> {booking.paymentStatus} <br />
                                            <strong>Booking Status:</strong> {booking.bookingStatus} <br />
                                            {booking.cancelReason && <><strong>Cancel Reason:</strong> {booking.cancelReason} <br /></>}
                                            <strong>Cancelled At:</strong> {booking.cancelledAt ? new Date(booking.cancelledAt).toLocaleString() : "N/A"}
                                        </Card.Text>
                                        <Button variant="primary">View Booking</Button>
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

export default CancelBooking;
