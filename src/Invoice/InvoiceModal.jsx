import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { downloadBookingInvoiceRecipet } from "../config/redux/action/invoiceAction";
import styles from "../stylesModule/Invoice/Invoice.module.css";
import companyLogo from "../assets/NAS.jpg";


const InvoiceModal = ({ show, onClose, invoice }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!invoice) return null;
  const booking = invoice.booking;

  const handleDownload = async () => {
    await dispatch(
      downloadBookingInvoiceRecipet({ bookingId: booking._id, token })
    );
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered className={styles.invoiceModal} scrollable>
      <Modal.Body className={styles.modalContainer}>



        {/* ================= COMPANY BILL HEADER ================= */}
        <div className={styles.banner}>
          <div className={styles.companyHeader}>
            <img
              src={companyLogo}
              alt="FANS PVT LIMITED"
              className={styles.companyLogo}
            />

            <div>
              <div className={styles.companyName}>
                FANS PVT LIMITED
              </div>
              <div className={styles.companyTagline}>
                Official Booking Invoice
              </div>
            </div>
          </div>

          <div className={styles.invoiceMeta}>
            <p><strong>Invoice No:</strong> {invoice.invoiceNumber}</p>
            <p><strong>Booking Code:</strong> {booking.bookingCode}</p>
            <p><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
          </div>
        </div>


        {/* ================= INVOICE SUMMARY ================= */}
        <div className={styles.section}>
          <h5 className={styles.heading}>Invoice Summary</h5>
          <Row>
            <Col md={6}>
              <p><span className={styles.label}>Invoice Date:</span> {new Date(invoice.createdAt).toLocaleDateString()}</p>
            </Col>
            <Col md={6}>
              <p><span className={styles.label}>Payment Method:</span> {booking.paymentMethod}</p>
            </Col>
          </Row>
        </div>

        {/* ================= GUEST INFO ================= */}
        <div className={styles.section}>
          <h5 className={styles.heading}>Guest Information</h5>
          <Row>
            <Col md={6}>
              <p><span className={styles.label}>Name:</span> {booking.user?.name}</p>
              <p><span className={styles.label}>Email:</span> {booking.user?.email}</p>
            </Col>
            <Col md={6}>
              <p><span className={styles.label}>Phone:</span> {booking.user?.phone}</p>
              <p><span className={styles.label}>Status:</span> {booking.bookingStatus}</p>
            </Col>
          </Row>
        </div>


        {/* ================= PROPERTY INFO ================= */}
        <div className={styles.section}>
          <h5 className={styles.heading}>Property Details</h5>
          <Row>
            <Col md={6}>
              <p><span className={styles.label}>Property:</span> {booking.property?.title}</p>
              <p><span className={styles.label}>City:</span> {booking.property?.city}</p>
            </Col>
            <Col md={6}>
              <p><span className={styles.label}>Check-In:</span> {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p><span className={styles.label}>Check-Out:</span> {new Date(booking.checkOut).toLocaleDateString()}</p>
            </Col>
          </Row>
        </div>



        {/* =========================GUEST COUNT==========================*/}
        <div className={styles.section}>


          <h5 className={styles.heading}>Guest Count</h5>
          <p>
            <strong>Adults:</strong> {booking.guests?.adults ?? 0},
            <strong> Children:</strong> {booking.guests?.children ?? 0},
            <strong> Infants:</strong> {booking.guests?.infants ?? 0},
            <strong> Pets:</strong> {booking.guests?.pets ?? 0}

          </p>
        </div>

        {/* ================= PAYMENT DETAILS ================= */}
        <div className={styles.section}>
          <h5 className={styles.heading}>Payment Breakdown</h5>
          <Row>
            <Col md={6}>
              <p>Price/Night: ₹{booking.pricePerNight}</p>
              <p>Nights: {booking.numberOfNights}</p>
            </Col>
            <Col md={6}>
              <p>Tax: ₹{booking.taxAmount}</p>
              <p><strong>Discount:</strong> ₹{booking.discountAmount}</p>
              <p className={styles.totalAmount}>
                Total: ₹{booking.totalAmount}
              </p>
            </Col>
          </Row>
        </div>
        {/* ===== Background Watermark ===== */}
        <div className={styles.watermark}>
          FANS PVT LIMITED
        </div>
        {/* ================= TRANSACTIONS ================= */}
        <div className={styles.section}>
          <h5 className={styles.heading}>Transaction Details</h5>

          {/* Cash Booking */}
          {booking.statusHistory?.some(s => s.note?.toLowerCase().includes("cash")) && (
            <div className={styles.transactionBox}>
              <p><strong>Initial Booking:</strong> Cash</p>
              <p>Amount Pending: ₹{booking.totalAmount}</p>
              <p className={styles.statusPending}>Payment Pending</p>
            </div>
          )}


          {/* Online Payment */}
          {booking.paymentId && (
            <div className={styles.transactionBox}>
              <p><strong>Online Payment (Razorpay)</strong></p>
              <p>Payment ID: {booking.paymentId}</p>
              <p className={styles.statusPaid}>Payment Successful</p>
            </div>
          )}

          {/* Extra / Refund History */}
          {booking.statusHistory
            ?.filter(s =>
              s.note?.toLowerCase().includes("extra") ||
              s.note?.toLowerCase().includes("refund")
            )
            .map((item, i) => (
              <p key={i} className={styles.transactionItem}>
                {new Date(item.changedAt).toLocaleDateString()} – {item.note}
              </p>
            ))}
        </div>



        {/* =========================
             PROPERTY OWNER INFO
        ==========================*/}
        <div className={styles.section}>
          <h5 className={styles.heading}>Property Owner</h5>
          <p><strong>Name:</strong> {invoice.propertyOwner?.name || "N/A"}</p>
          <p><strong>Email:</strong> {invoice.propertyOwner?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {invoice.propertyOwner?.phone || "N/A"}</p>
        </div>
        {/* ================= FOOTER ================= */}
        <div className={styles.footerActions}>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={handleDownload}>
            Download Invoice PDF
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default InvoiceModal;
