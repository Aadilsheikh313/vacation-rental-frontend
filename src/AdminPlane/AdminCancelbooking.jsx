import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";
import { getAdminAllCancelBookingPosts } from "../config/redux/action/adminDashboardAction";

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

    if (isLoading) return <Spinner animation="border" className="mx-auto d-block my-4" />;
    if (isError) return <Alert variant="danger">{message}</Alert>;

    return (
        <>
            <h4 className="text-center mb-4 text-danger">❌ Cancelled Booking Properties</h4>

            <Card className="text-center shadow-sm bg-light mb-4">
                <Card.Body>
                    <h5 className="text-info">Total Cancelled Bookings: {cancelBookingCount}</h5>
                </Card.Body>
            </Card>

            {cancelBooking && cancelBooking.length > 0 ? (
                <Row className="gy-4">
                    {cancelBooking.map((booking, idx) => (
                        <Col md={6} lg={4} key={booking._id || idx}>
                            <Card className="shadow-sm h-100">
                                <Card.Img
                                    variant="top"
                                    src={booking.property?.image?.url || "/default-property.jpg"}
                                    style={{ maxHeight: "250px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <h5 className="mb-2">{booking.property?.title || "No Title"}</h5>
                                    <p className="text-muted mb-1">
                                        📍 {booking.property?.location || "N/A"}, {booking.property?.city || ""}
                                    </p>
                                    <p>💰 ₹{booking.property?.price || "N/A"}</p>

                                    <hr />
                                    <h6 className="mb-2">👤 Guest Info</h6>
                                    <p>Name: {booking.guest?.name || "N/A"}</p>
                                    <p>📞 {booking.guest?.phone || "N/A"}</p>
                                    <p>✉️ {booking.guest?.email || "N/A"}</p>

                                    <hr />
                                    <h6 className="mb-2">🏠 Host Info</h6>
                                    <p>Name: {booking.host?.name || "N/A"}</p>
                                    <p>📞 {booking.host?.phone || "N/A"}</p>
                                    <p>✉️ {booking.host?.email || "N/A"}</p>

                                    <hr />
                                    <p>💳 Payment Method: {booking.paymentMethod || "N/A"}</p>
                                    <Badge bg={booking.paymentStatus === "paid" ? "success" : "warning"}>
                                        {booking.paymentStatus || "pending"}
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
        </>
    );
};

export default AdminCancelBooking;
