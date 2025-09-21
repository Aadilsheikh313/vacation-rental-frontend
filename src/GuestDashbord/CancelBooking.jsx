import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetGuestCancelBookingPost } from "../config/redux/action/guestDashAction";
import { Card, Button, Alert, CardTitle } from "react-bootstrap";
import CustomSpinner from "../comman/Spinner";
import styles from '../stylesModule/Booking/CardCancelBooking.module.css';
import { MdCancel, MdOutlineTravelExplore } from "react-icons/md";
import { FaRegHeart, FaStreetView } from "react-icons/fa";
import { GiJetFighter } from "react-icons/gi";
import { WiStars } from "react-icons/wi";

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
                    <MdCancel /> Cancelled trips for{" "}
                    <span className={styles.username}>{user?.name}</span>
                </h2>
                <p className={styles.subHeading}>
                    Sometimes plans change, and that’s okay <FaRegHeart />.
                    Here you can find the trips you had to cancel.
                    Don’t worry, <MdOutlineTravelExplore className={styles.icon} /> new adventures are waiting for you! <GiJetFighter /> <WiStars />
                </p>
            </div>

            {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}

            {isSuccess && CancelBooking?.length === 0 && (
                <Alert variant="info"><strong>Sorry {user?.name}</strong>, no cancelled bookings found.</Alert>
            )}

            {CancelBooking?.length > 0 && (
                <>
                    <div className={styles.cancelBookingcount}>
                        <p><strong>Total Cancelled Bookings: </strong>{CancelBooking.length}</p>
                    </div>
                    <div className={styles.cardConatiner}>
                        {CancelBooking.map((booking) => (
                            <div className={styles.Carddata} key={booking._id}>
                                <Card className={styles.CancelBookingCard}>
                                    <Card.Img className={styles.image} variant="top" src={booking.property?.image?.url || "/default.jpg"} />
                                    <Card.Body className={styles.CardBody}>
                                        <Card.Title className={styles.CardTitle}>{booking.property?.title || "Property"}</Card.Title>
                                        <Card.Text className={styles.CardText}>
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
    )
}

export default CancelBooking;
