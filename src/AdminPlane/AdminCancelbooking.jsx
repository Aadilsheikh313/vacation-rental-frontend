import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";
import { getAdminAllCancelBookingPosts } from "../config/redux/action/adminDashboardAction";
import CustomSpinner from "../comman/Spinner";
import styles from "../adminStylesModule/adminCanceld.module.css";
import {
    FaMapMarkerAlt,
    FaRupeeSign,
    FaUser,
    FaPhoneAlt,
    FaEnvelope,
    FaHome,
    FaMoneyBillWave,
    FaBan
} from "react-icons/fa";


const AdminCancelBooking = () => {
    const dispatch = useDispatch();
    const {
        cancelBooking,
        cancelBookingCount,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.adminDashboard);
    useEffect(() => {
        dispatch(getAdminAllCancelBookingPosts());
        return () => dispatch(resetDashboardState());
    }, [dispatch]);

    if (isLoading) return <CustomSpinner />;
    if (isError) return <Alert variant="danger">{message}</Alert>;

    return (
        <div className={styles.cencebookingContainer}>
            <h4 className={styles.cancelBookingheading}>❌ Cancelled Booking Properties</h4>

            <Card className={styles.totalecountcard}>
                <Card.Body>
                    <h5 className={styles.count}>Total Cancelled Bookings: {cancelBookingCount}</h5>
                </Card.Body>
            </Card>

            {cancelBooking && cancelBooking.length > 0 ? (
                <Row className={styles.bookingrow}>
                    {cancelBooking.map((booking, idx) => (
                        <Col md={6} lg={4} key={booking._id || idx}>
                            <Card className={styles.bookingCard}>
                                <Card.Img
                                    variant="top"
                                    src={booking.property?.image?.url || "/default-property.jpg"}
                                    className={styles.bookingimage}
                                />
                                <Card.Body>
                                    <h5 className={styles.propertyTitle}>
                                        <FaHome /> {booking.property?.title || "No Title"}
                                    </h5>

                                    <p className={styles.propertyLocation}>
                                        <FaMapMarkerAlt /> {booking.property?.location}, {booking.property?.city}
                                    </p>

                                    <p className={styles.price}>
                                        <FaRupeeSign /> {booking.property?.price}
                                    </p>

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

                                    <Badge
                                        bg={booking.paymentStatus === "refunded" ? "danger" : "warning"}
                                        className={styles.statusBadge}
                                    >
                                        <FaBan /> {booking.paymentStatus}
                                    </Badge>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="info" className="text-center mt-4">
                    No cancelled bookings found.
                </Alert>
            )}
        </div>
    );
};

export default AdminCancelBooking;
