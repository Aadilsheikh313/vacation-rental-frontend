import React, { useEffect } from "react"
import styles from "../stylesModule/Booking/UpcommingBooking.module.css"
import { useDispatch, useSelector } from "react-redux"
import { GetGuestUpcommingtBookingPost } from "../config/redux/action/guestDashAction";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CustomSpinner from "../comman/Spinner";
import { Alert } from "react-bootstrap";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";

const UpcommingBooking = () => {
    const dispath = useDispatch();
    const { UpcommingBooking, isLoading, isError, isSuccess, message } = useSelector((state) => state.guestDash);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispath(GetGuestUpcommingtBookingPost());
    }, [dispath]);
    return (
        <div className={styles.UpcommingBookingContainer}>
            <div className={styles.upperText}>
                <h2 className={styles.headingTitle}>
                    <BsCalendar2Event /> Upcoming trips for{" "}
                    <span className={styles.username}>{user?.name}</span>
                </h2>
                <p className={styles.subHeading}>
                    Get ready for your next adventure{" "}
                    <MdOutlineTravelExplore className={styles.icon} />. Pack your bags and
                    plan ahead to make the most of your stay!
                </p>
            </div>
            {isLoading ? (
                <CustomSpinner />
            ) : (
                <>
                    {/* Error State */}
                    {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}

                    {/* Success but no bookings */}
                    {isSuccess && UpcommingBooking?.length === 0 && (
                        <Alert variant="info"><strong>Sorry {user?.name}</strong>No upcoming bookings found</Alert>
                    )}
                    <div className={styles.pastBookingcount}>
                        <p><strong>Total  booking = </strong>{UpcommingBooking?.length}</p>
                    </div>
                    <div className={styles.CardConatiner}>
                        {UpcommingBooking?.map((booking) => (
                            <div className={styles.CardStyle} key={booking._id}>
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
    )
}
export default UpcommingBooking