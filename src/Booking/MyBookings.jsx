import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { getBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import EditBookingModal from "./EditBookingModal";
import CancelBookingModal from "./CancelBookingModal";


const MyBooking = () => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { bookings, isLoading, isError, message } = useSelector((state) => state.booking);
  const { singlePost } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBookingPropertyPosts());
  }, [dispatch]);

  return (
    <Container className="my-5">
      <h2 className="mb-4">My Bookings</h2>

      {isLoading && <Spinner animation="border" />}

      {isError && <Alert variant="danger">{message}</Alert>}

      {!isLoading && bookings?.length === 0 && (
        <Alert variant="info">No bookings found.</Alert>
      )}

      <Row>
        {bookings?.map((booking) => (
          <Col md={6} lg={4} key={booking._id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={booking.property?.image?.url}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{booking.property?.title}</Card.Title>
                <Card.Text as="div">
                  <div><strong>City:</strong> {booking.property?.city}</div>
                  <div><strong>Check-In:</strong> {new Date(booking.checkIn).toDateString()}</div>
                  <div><strong>Check-Out:</strong> {new Date(booking.checkOut).toDateString()}</div>
                  <div><strong>Status:</strong> {booking.bookingStatus}</div>
                  <div><strong>Total:</strong> ₹{booking.totalAmount}</div>

                </Card.Text>
                <div><strong>Connect with Property Owner</strong></div>
                <div><strong>Contact:</strong> {booking.property?.userId?.phone} / {booking.property?.userId?.email}</div>
                {
                  
                }
                <div><strong>Refunded:</strong> {booking.isRefunded ? "✅ Yes" : "❌ No"}</div>

              </Card.Body>
              <button
                className="btn btn-warning mt-2  ms-2 m-2"
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowEditModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger mt-2 ms-2 m-2"
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowCancelModal(true);
                }}
              >
                Cancel Booking
              </button>
            </Card>


          </Col>
        ))}
      </Row>
      {selectedBooking && (
        <EditBookingModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          booking={selectedBooking}
          token={token}
        />
      )}
      {selectedBooking && (
        <CancelBookingModal
          show={showCancelModal}
          handleClose={() => setShowCancelModal(false)}
          bookingId={selectedBooking._id}
          token={token}
        />
      )}
    </Container>
  );
};

export default MyBooking;
