import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { getBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import EditBookingModal from "./EditBookingModal";
import CancelBookingModal from "./CancelBookingModal";
import InvoiceModal from "../Invoice/InvoiceModal";
import { downloadBookingInvoiceRecipet, viewInvoiceRecipet } from "../config/redux/action/invoiceAction";
import { showError } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";


const MyBooking = () => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { bookings, isLoading, isError, message } = useSelector((state) => state.booking);

  const { isLoading: invoiceLoading } = useSelector((state) => state.invoice);


  useEffect(() => {
    dispatch(getBookingPropertyPosts());
  }, [dispatch]);

  const upcomingBookings = bookings?.filter(
    (b) =>
      b.bookingStatus !== "cancelled" &&
      new Date(b.checkOut) >= new Date()
  );

  const handleViewInvoice = async (bookingId) => {

    try {
      const result = await dispatch(viewInvoiceRecipet({ bookingId, token }));

      if (result?.payload?.invoice) {
        setInvoiceData(result.payload.invoice);
        setShowInvoiceModal(true);
      } else {
        showError("Invoice not yet generated.");
      }
    } catch (error) {
      console.error("Invoice view/download failed:", error);
    }
  };

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token]);

  return (
    <Container className="my-5">
      <h2 className="mb-4">My Active Bookings</h2>

      {isLoading && <Spinner animation="border" />}

      {isError && <Alert variant="danger">{message}</Alert>}

      {!isLoading && bookings?.length === 0 && (
        <Alert variant="info">No bookings found.</Alert>
      )}

      <Row>
        {upcomingBookings?.map((booking) => (
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
                  <div><strong>Payment Mode:</strong> {booking.paymentMethod}</div>
                </Card.Text>
                <div><strong>Connect with Property Owner</strong></div>
                <div><strong>Contact:</strong> {booking.property?.userId?.phone} / {booking.property?.userId?.email}</div>
                <div><strong>Refunded:</strong> {booking.isRefunded ? "✅ Yes" : "❌ No"}</div>
              </Card.Body>

              <button
                className="btn btn-warning mt-2 ms-2 m-2"
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

              <button
                className="btn btn-success mt-2 ms-2 m-2"
                onClick={() => handleViewInvoice(booking._id)}
                disabled={invoiceLoading}
              >
                {invoiceLoading ? "Loading..." : "View Invoice"}
              </button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modals */}
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
      {showInvoiceModal && (
        <InvoiceModal
          show={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          invoice={invoiceData}
        />
      )}
    </Container>
  );
};

export default MyBooking;
