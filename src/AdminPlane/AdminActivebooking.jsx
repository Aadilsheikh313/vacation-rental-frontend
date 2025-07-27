
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { getAllAdminActiveBookingPosts } from "../config/redux/action/adminDashboardAction";
import { resetDashboardState } from "../config/redux/reducer/adminDashboardReducer";

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

    if (isLoading) return <Spinner animation="border" className="mx-auto d-block my-4" />;
    if (isError) return <Alert variant="danger">{message}</Alert>;

    return (
        <>
            <h4 className="text-center mb-3">🟢 Active Booking Properties</h4>
            <Card className="text-center shadow-sm bg-light">
                <Card.Body>
                    <h4 className="text-info">🏠 Total Active Bookings :  { activeBookingCount}</h4>
                </Card.Body>
            </Card>
            {activeBookings && activeBookings.length > 0 ? (
                <Row className="gy-4">
                    {activeBookings.map((booking) => (
                        <Col md={6} lg={4} key={booking.bookingId}>
                            <Card className="shadow-sm h-100">
                                <Card.Img
                                    variant="top"
                                    src={booking.property?.image?.url}
                                    style={{ maxHeight: "300px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <h5>{booking.property?.title}</h5>
                                    <p>📍 {booking.property?.location}, {booking.property?.city}</p>
                                    <p>💰 ₹{booking.property?.price}</p>
                                    <hr />
                                    <p>👤 Guest: {booking.guest?.name}</p>
                                    <p>📞 {booking.guest?.phone}</p>
                                    <p>✉️ {booking.guest?.email}</p>
                                    <hr />
                                    <p>👤 Host: {booking.host?.name}</p>
                                    <p>📞 {booking.host?.phone}</p>
                                    <p>✉️ {booking.host?.email}</p>
                                    <hr />
                                    <p>💳 Payment: {booking.paymentMethod}</p>
                                    <Badge bg={booking.paymentStatus === "paid" ? "success" : "warning"}>
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
