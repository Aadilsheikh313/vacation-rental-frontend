import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Container, Row, Col, Badge } from "react-bootstrap";
import { getAdminAllPastgBookingPosts } from "../config/redux/action/adminDashboardAction";
import styles from "../adminStylesModule/adminPast.module.css";
import CustomSpinner from "../comman/Spinner";
import {
    FaHome,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaCalendarAlt,
    FaBed,
    FaUser,
    FaPhoneAlt,
    FaEnvelope,
    FaMoneyBillWave,
    FaHistory
} from "react-icons/fa";


const AdminPastBooking = () => {
    const dispatch = useDispatch();

    const {
        pastBookings,
        totalPastCount,
        totalPastAmount,
        isLoading,
        isError,
        message,
    } = useSelector((state) => state.adminDashboard);

    useEffect(() => {
        dispatch(getAdminAllPastgBookingPosts());
    }, [dispatch]);

    return (
        <div className={styles.pastbookingContainer}>
            <Container className={styles.AdminPastBookingwarp}>
                <h3 className={styles.headingpast}>
                    <FaHistory /> Past Booking Properties
                </h3>
                {isLoading && (
                    <div>
                        <CustomSpinner />
                    </div>
                )}

                {isError && <Alert variant="danger">{message}</Alert>}

                {!isLoading && !isError && (
                    <>
                        <Card className={styles.summarycard}>
                            <Card.Body>
                                <h5 className={styles.cardinfo}>Total Past Bookings: {totalPastCount}</h5>
                                <h6 className={styles.revienw}>
                                    Total Revenue (Past): ₹{totalPastAmount.toLocaleString()}
                                </h6>
                            </Card.Body>
                        </Card>

                        {pastBookings.length === 0 ? (
                            <Alert variant="info" className="text-center mt-4">
                                No Past bookings found.
                            </Alert>
                        ) : (
                            <Row className={styles.pastbookingrow}>
                                {pastBookings.map((booking, idx) => (
                                    <Col md={6} lg={4} key={booking.bookingId || idx}>
                                        <Card className={styles.bookingCard}>
                                            <Card.Img
                                                variant="top"
                                                src={booking.property?.image?.url || "/default-property.jpg"}
                                                className={styles.cardimage}
                                            />
                                            <Card.Body>
                                                <h5 className={styles.propertytitele}>
                                                    <FaHome /> {booking.property?.title || "No Title"}
                                                </h5>

                                                <p className={styles.propertylocation}>
                                                    <FaMapMarkerAlt /> {booking.property?.location}, {booking.property?.city}
                                                </p>

                                                <p className={styles.price}>
                                                    <FaRupeeSign /> {booking.property?.price}/night
                                                </p>


                                                <hr />
                                                <h6 className={styles.sectionTitle}>
                                                    <FaCalendarAlt /> Booking Dates
                                                </h6>
                                                <p>Check-in: {new Date(booking.bookingDates.checkIn).toLocaleDateString()}</p>
                                                <p>Check-out: {new Date(booking.bookingDates.checkOut).toLocaleDateString()}</p>
                                                <p><FaBed /> Nights: {booking.bookingDates.nights}</p>


                                                <hr />
                                                <h6 className={styles.sectionTitle}><FaUser /> Guest Info</h6>
                                                <p><FaUser /> {booking.guest?.name}</p>
                                                <p><FaPhoneAlt /> {booking.guest?.phone}</p>
                                                <p><FaEnvelope /> {booking.guest?.email}</p>

                                                <hr />

                                                <h6 className={styles.sectionTitle}><FaHome /> Host Info</h6>
                                                <p><FaUser /> {booking.host?.name}</p>
                                                <p><FaPhoneAlt /> {booking.host?.phone}</p>
                                                <p><FaEnvelope /> {booking.host?.email}</p>


                                                <hr />
                                                <p className={styles.payment}>
                                                    <FaMoneyBillWave /> {booking.paymentMethod || "N/A"}
                                                </p>
                                                <p>💰 Amount: ₹{booking.property?.totalAmount}</p>
                                                <Badge
                                                    bg={booking.paymentDetails?.status === "Paid" ? "success" : "warning"}
                                                    className={styles.statusBadge}
                                                >
                                                    {booking.paymentDetails?.status || "Pending"}
                                                </Badge>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default AdminPastBooking;
