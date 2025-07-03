import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Container, Row, Col, Card, Badge } from "react-bootstrap";
import moment from "moment";
import { getHostBookingHistoryPosts } from "../../config/redux/action/bookingAction ";
import { resetBookingStatus } from "../../config/redux/reducer/bookingReducer";

const BookingHistory = ({ token }) => {
    const dispatch = useDispatch();

    const {
        historyBookings,
        isLoading,
        isError,
        message,
        totalRevenue,
        totalNights,
        totalBookings,
    } = useSelector((state) => state.booking);

    useEffect(() => {
        if (token) {
            dispatch(getHostBookingHistoryPosts({ token }));
        }

        return () => {
            dispatch(resetBookingStatus());
        };
    }, [dispatch, token]);


    return (
        <Container className="mt-4">
            <h2 className="mb-4">📜 Your Property Booking History</h2>

            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading booking history...</p>
                </div>
            ) : isError ? (
                <p className="text-danger">{message}</p>
            ) : historyBookings?.length === 0 ? (
                <p className="text-muted">No booking history found.</p>
            ) : (
                <>
                    <Row className="mb-3">
                        <Col md={4}><strong>Total Bookings:</strong> {totalBookings}</Col>
                        <Col md={4}><strong>Total Nights:</strong> {totalNights}</Col>
                        <Col md={4}><strong>Total Revenue:</strong> ₹{totalRevenue}</Col>
                    </Row>

                    <Row>
                        {historyBookings.map((booking) => (
                            <Col key={booking._id} md={6} lg={4} className="mb-4">
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={booking.property?.image?.url}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{booking.property?.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Guest:</strong> {booking.user?.name} <br />
                                            <strong>Email:</strong> {booking.user?.email} <br />
                                            <strong>Phone:</strong> {booking.user?.phone || "N/A"} <br />
                                            <strong>City:</strong> {booking.property?.city} <br />
                                            <strong>Check-in:</strong> {moment(booking.checkIn).format("LL")} <br />
                                            <strong>Check-out:</strong> {moment(booking.checkOut).format("LL")} <br />
                                            <strong>Nights:</strong> {booking.numberOfNights} <br />
                                            <strong>Total:</strong> ₹{booking.totalAmount} <br />
                                            <strong>Status:</strong>{" "}
                                            <Badge bg={booking.bookingStatus === "cancelled" ? "danger" : "success"}>
                                                {booking.bookingStatus}
                                            </Badge>
                                            {booking.bookingStatus === "cancelled" && (
                                                <Badge bg="danger" className="ms-2">Cancelled</Badge>
                                            )}

                                        </Card.Text>

                                        {booking.review && (
                                            <div>
                                                <strong>Review:</strong> <i>{booking.review.comment}</i> <br />
                                                <strong>Rating:</strong> ⭐ {booking.review.rating}/5
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
};

export default BookingHistory;
