
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { getAllAdminActiveBookingPosts } from "../config/redux/action/adminDashboardAction";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";
import styles from "../adminStylesModule/adminactive.module.css";
import CustomSpinner from "../comman/Spinner";
import {
    FaUser,
    FaPhoneAlt,
    FaEnvelope,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaHome,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";


const AdminActiveBooking = () => {
    const dispatch = useDispatch();
    const {
        activeBookings,
        activeBookingCount,
        isLoading,
        isError,
        isSuccess,
        message,

    } = useSelector((state) => state.adminDashboard);


    useEffect(() => {
        dispatch(getAllAdminActiveBookingPosts());
        return () => dispatch(resetDashboardState());
    }, [dispatch]);

    if (isLoading) return <CustomSpinner />;
    if (isError) return <Alert variant="danger">{message}</Alert>;

    return (
        <>
            <h4 className={styles.activeBookingTitle}>🟢 Active Booking Properties</h4>
            <Card className={styles.activeBookingCard}>
                <Card.Body>
                    <h4 className={styles.countactivebooking}>🏠 Total Active Bookings :  {activeBookingCount}</h4>
                </Card.Body>
            </Card>
            {activeBookings && activeBookings.length > 0 ? (
                <Row className={styles.bookingrow}>
                    {activeBookings.map((booking) => (
                        <Col md={6} lg={4} key={booking.bookingId}>
                            <Card className={styles.bookingCard}>
                                <Card.Img
                                    variant="top"
                                    src={booking.property?.image?.url}
                                    className={styles.bookingimage}
                                />
                                <Card.Body className={styles.cardBody}>
                                    <h5 className={styles.propertyTitle}>
                                        <FaHome /> {booking.property?.title}
                                    </h5>

                                    <p className={styles.location}>
                                        <FaMapMarkerAlt /> {booking.property?.location},{" "}
                                        {booking.property?.city}
                                    </p>

                                    <p className={styles.price}>
                                        <FaMoneyBillWave /> ₹{booking.property?.price}
                                    </p>

                                    <div className={styles.divider}></div>

                                    {/* Guest */}
                                    <p className={styles.sectionTitle}>👤 Guest</p>
                                    <p className={styles.infoRow}>
                                        <FaUser /> {booking.guest?.name}
                                    </p>
                                    <p className={styles.infoRow}>
                                        <FaPhoneAlt /> {booking.guest?.phone}
                                    </p>
                                    <p className={styles.infoRow}>
                                        <FaEnvelope /> {booking.guest?.email}
                                    </p>

                                    <div className={styles.divider}></div>

                                    {/* Host */}
                                    <p className={styles.sectionTitle}>🏠 Host</p>
                                    <p className={styles.infoRow}>
                                        <FaUser /> {booking.host?.name}
                                    </p>
                                    <p className={styles.infoRow}>
                                        <FaPhoneAlt /> {booking.host?.phone}
                                    </p>
                                    <p className={styles.infoRow}>
                                        <FaEnvelope /> {booking.host?.email}
                                    </p>

                                    <div className={styles.divider}></div>

                                    {/* Payment */}
                                    <p className={styles.paymentRow}>
                                        <MdPayments /> {booking.paymentMethod}
                                    </p>

                                    <Badge
                                        className={styles.statusBadge}
                                        bg={booking.paymentStatus === "paid" ? "success" : "warning"}
                                    >
                                        {booking.paymentStatus}
                                    </Badge>
                                </Card.Body>

                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="info">No active bookings found.</Alert>
            )}

        </>
    );
};

export default AdminActiveBooking;
