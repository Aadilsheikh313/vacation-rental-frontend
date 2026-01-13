import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import EditBookingModal from "./EditBookingModal";
import CancelBookingModal from "./CancelBookingModal";
import InvoiceModal from "../Invoice/InvoiceModal";
import { viewInvoiceRecipet } from "../config/redux/action/invoiceAction";
import { showError } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../comman/Spinner";
import styles from "../stylesModule/Booking/MyBooking.module.css";
import BookingPage from "../assets/BookingPage.jpg";
import { getBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import { TbCancel } from "react-icons/tb";
import { MdOutlineEditCalendar, MdOutlineStreetview } from "react-icons/md";

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
  }, [user, token, navigate]);

  const handleclickHome = () => {
    navigate("/")
  }

  return (
    <Container className={styles.myBookingContainer}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${BookingPage})` }}
      ></div>
      <div className={styles.overlay}>
        <div className={styles.heroText}>
          <h3>Welcome to Your Journey</h3>
          <p>
            Every booking is more than just a stay – it’s a step towards new
            memories, peaceful reflections, and unforgettable experiences.
            Thank you for choosing us to be part of your story.
          </p>
          <div className={styles.breadcrumb}>
            <input type="button" value="Home" onClick={handleclickHome} /> / Booked Page
          </div>
        </div>
      </div>

      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {isError && <Alert variant="danger">{message}</Alert>}

          {!isLoading && bookings?.length === 0 && (
            <Alert variant="info">No bookings found.</Alert>
          )}

          <Row className={styles.CardRow}>
            {upcomingBookings?.map((booking) => (
              <Col md={6} lg={4} key={booking._id} className="mb-4">
                <Card className={`shadow-sm ${styles.bookingCard}`}>
                  <Card.Img
                    variant="top"
                    src={booking.property?.image?.url}
                    className={styles.cardImage}
                  />
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>
                      {booking.property?.title}
                    </Card.Title>
                    <Card.Text as="div" className={styles.cardText}>
                      <div><strong>City:</strong> {booking.property?.city}</div>
                      <div><strong>Check-In:</strong> {new Date(booking.checkIn).toDateString()}</div>
                      <div><strong>Check-Out:</strong> {new Date(booking.checkOut).toDateString()}</div>
                      <div><strong>Status:</strong> {booking.bookingStatus}</div>
                      <div><strong>Total:</strong> ₹{booking.totalAmount}</div>
                      <div><strong>Payment Mode:</strong> {booking.paymentMethod}</div>
                    </Card.Text>

                    <div className={styles.ownerInfo}>
                      <strong className={styles.ownerTitle}>
                        Connect with Property Owner
                      </strong>

                      <div className={styles.contactRow}>
                        <strong>Phone:</strong>
                        <a
                          href={`tel:${booking.property?.userId?.phone}`}
                          className={styles.contactLink}
                        >
                          {booking.property?.userId?.phone}
                        </a>
                      </div>

                      <div className={styles.contactRow}>
                        <strong>Email:</strong>
                        <a
                          href={`mailto:${booking.property?.userId?.email}`}
                          className={styles.contactLink}
                        >
                          {booking.property?.userId?.email}
                        </a>
                      </div>

                      <div className={styles.refundRow}>
                        <strong>Refunded:</strong>
                        <span
                          className={
                            booking.isRefunded
                              ? styles.refundedYes
                              : styles.refundedNo
                          }
                        >
                          {booking.isRefunded ? " Yes" : " No"}
                        </span>
                      </div>
                    </div>

                  </Card.Body>

                  <div className={styles.buttonGroup}>
                    <button
                      className={`${styles.actionButton} ${styles.btnedit}`}
                      onClick={() => { setSelectedBooking(booking); setShowEditModal(true); }}
                    >
                      <MdOutlineEditCalendar /> Edit
                    </button>

                    <button
                      className={`${styles.actionButton} ${styles.btncancel}`}
                      onClick={() => { setSelectedBooking(booking); setShowCancelModal(true); }}
                    >
                      <TbCancel /> Cancel Booking
                    </button>

                    <button
                      className={`${styles.actionButton} ${styles.btninvoice}`}
                      onClick={() => handleViewInvoice(booking._id)}
                      disabled={invoiceLoading}
                    >
                      <MdOutlineStreetview /> {invoiceLoading ? "Loading..." : "View Invoice"}
                    </button>
                  </div>

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
        </>
      )}
    </Container>
  );
};

export default MyBooking;
