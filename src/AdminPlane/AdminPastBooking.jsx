import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Alert, Card, Container, Row, Col, Badge } from "react-bootstrap";
import { getAdminAllPastgBookingPosts } from "../config/redux/action/adminDashboardAction";

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
        <Container className="mt-4">
            <h3 className="mb-4 text-warning text-center">📅 Past Booking Properties</h3>

            {isLoading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {isError && <Alert variant="danger">{message}</Alert>}

            {!isLoading && !isError && (
                <>
                    <Card className="text-center shadow-sm bg-light mb-4">
                        <Card.Body>
                            <h5 className="text-info">Total Past Bookings: {totalPastCount}</h5>
                            <h6 className="text-success">
                                Total Revenue (Past): ₹{totalPastAmount.toLocaleString()}
                            </h6>
                        </Card.Body>
                    </Card>

                    {pastBookings.length === 0 ? (
                        <Alert variant="info" className="text-center mt-4">
                            No Past bookings found.
                        </Alert>
                    ) : (
                        <Row className="gy-4">
                            {pastBookings.map((booking, idx) => (
                                <Col md={6} lg={4} key={booking.bookingId || idx}>
                                    <Card className="shadow-sm h-100">
                                        <Card.Img
                                            variant="top"
                                            src={booking.property?.image?.url || "/default-property.jpg"}
                                            style={{ maxHeight: "250px", objectFit: "cover" }}
                                        />
                                        <Card.Body>
                                            <h5 className="mb-2">{booking.property?.title || "No Title"}</h5>
                                            <p className="text-muted mb-1">
                                                📍 {booking.property?.location}, {booking.property?.city}
                                            </p>
                                            <p>💰 ₹{booking.property?.price}/night</p>

                                            <hr />
                                            <h6 className="mb-2">📅 Booking Dates</h6>
                                            <p>
                                                Check-in:{" "}
                                                {new Date(booking.bookingDates.checkIn).toLocaleDateString()}
                                            </p>
                                            <p>
                                                Check-out:{" "}
                                                {new Date(booking.bookingDates.checkOut).toLocaleDateString()}
                                            </p>
                                            <p>🛌 Nights: {booking.bookingDates.nights}</p>

                                            <hr />
                                            <h6 className="mb-2">👤 Guest Info</h6>
                                            <p>Name: {booking.guest?.name}</p>
                                            <p>📞 {booking.guest?.phone}</p>
                                            <p>✉️ {booking.guest?.email}</p>

                                            <hr />
                                            <h6 className="mb-2">🏠 Host Info</h6>
                                            <p>Name: {booking.host?.name}</p>
                                            <p>📞 {booking.host?.phone}</p>
                                            <p>✉️ {booking.host?.email}</p>

                                            <hr />
                                            <p>💳 Payment Method: {booking.paymentMethod || "N/A"}</p>
                                            <p>💰 Amount: ₹{booking.property?.totalAmount}</p>
                                            <Badge bg={booking.paymentDetails.status === "Paid" ? "success" : "warning"}>
                                                {booking.paymentDetails.status || "Pending"}
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
    );
};

export default AdminPastBooking;
