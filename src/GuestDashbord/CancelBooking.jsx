import React from "react";
import styles from '../stylesModule/Booking/CardCancelBooking.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CustomSpinner from "../comman/Spinner";
import { Alert } from "react-bootstrap";
import { GetGuestCancelBookingPost } from "../config/redux/action/guestDashAction";


const CancelBooking = () => {
    const dispath = useDispatch();
    const { CancelBooking, isLoading, isError, isSuccess, message } = useSelector((state) => state.guestDash);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispath(GetGuestCancelBookingPost());
    }, [dispath]);
    return (
        <div className={styles.CancelBookingConatiner}>
            <div className={styles.uppertext}>
                <h4>CoceclBooking</h4>
            </div>
            {/* Error State */}
            {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}

            {/* Success but no bookings */}
            {isSuccess && CancelBooking?.length === 0 && (
                <Alert variant="info"><strong>Sorry {user?.name}</strong>No Cancel bookings found</Alert>
            )}
            <div className={styles.pastBookingcount}>
                <p><strong>Total Cancel booking = </strong>{CancelBooking?.length}</p>
            </div>
            {isLoading ? (
                <CustomSpinner />
            ) : (
                <>
                    <div className={styles.cardConatiner}>
                        {CancelBooking.map((booking) => {
                            <div className={styles.Carddata} key={booking._id}>
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
                        })}
                    </div>
                </>
            )}

        </div>
    )
}

export default CancelBooking