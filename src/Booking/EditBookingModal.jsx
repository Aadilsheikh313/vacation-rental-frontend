import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, showError } from "../utils/toastUtils";
import styles from "../stylesModule/Booking/EditBooking.module.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { editBookingPosts } from "../config/redux/action/bookingAction ";
import { useNavigate } from "react-router-dom";
import { triggerExtraPayment } from "../Payment/ExtraPayment";

const EditBookingModal = ({ show, handleClose, booking, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.booking);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (booking) {
      setCheckIn(booking.checkIn.slice(0, 10));
      setCheckOut(booking.checkOut.slice(0, 10));
      setAdults(booking.guests.adults);
      setChildren(booking.guests.children);
    }
  }, [booking]);

  // Live Price Preview
  useEffect(() => {
    if (!booking) return;

    const pricePerNight = booking.property?.price || booking.pricePerNight;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));

    if (nights > 0) {
      const subtotal = pricePerNight * nights;
      const gstRate = pricePerNight >= 7500 ? 18 : pricePerNight >= 1001 ? 12 : 0;
      const taxAmount = Number(((subtotal * gstRate) / 100).toFixed(2));
      const newTotal = subtotal + booking.serviceFee + taxAmount - (booking.discountAmount || 0);
      const oldTotal = booking.totalAmount;

      setPaymentInfo({
        needToPay: newTotal > oldTotal,
        extraAmount: newTotal > oldTotal ? newTotal - oldTotal : 0,
        needRefund: newTotal < oldTotal,
        refundAmount: newTotal < oldTotal ? oldTotal - newTotal : 0,
      });
    }
  }, [checkIn, checkOut]);

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(checkOut) <= new Date(checkIn)) {
      return showError("Check-out must be after check-in");
    }

    const guests = {
      adults: Number(adults),
      children: Number(children),
      infants: booking.guests.infants,
      pets: booking.guests.pets,
    };

    try {
      const result = await dispatch(
        editBookingPosts({
          bookingId: booking._id,
          checkIn,
          checkOut,
          guests,
          token,
        })
      ).unwrap();

      // 🔥 EXTRA PAYMENT
      if (result.payment.needToPay) {
        showSuccess(`Extra payment required ₹${result.payment.extraAmount}`);
        handleClose();

        setTimeout(() => {
          triggerExtraPayment({
            dispatch,
            navigate,
            token,
            bookingId: booking._id,
          });
        }, 50);

        return;
      }

      // 🔥 REFUND
      if (result.payment.needRefund) {
        showSuccess(`Refund ₹${result.payment.refundAmount} will be processed`);
        handleClose();
        return;
      }

      // 🔥 NO PRICE CHANGE
      showSuccess("Booking updated successfully");
      handleClose();
    } catch (err) {
      showError(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName={styles.customModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header className={styles.HeaderEdit}>
          <Modal.Title>Modify Booking — Change Dates or Guests</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Check-In</Form.Label>
            <Form.Control type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Check-Out</Form.Label>
            <Form.Control type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
          </Form.Group>

          <div className={styles.guestRow}>
            <Form.Group>
              <Form.Label>Adults</Form.Label>
              <Form.Control type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Children</Form.Label>
              <Form.Control type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} />
            </Form.Group>
          </div>

          {paymentInfo && (
            <div className={styles.paymentBox}>
              {paymentInfo.needToPay && <p className={styles.extraPay}>Extra payment required: ₹{paymentInfo.extraAmount}</p>}
              {paymentInfo.needRefund && <p className={styles.refundPay}>Refund expected: ₹{paymentInfo.refundAmount}</p>}
              {!paymentInfo.needToPay && !paymentInfo.needRefund && <p className={styles.noChange}>No price change for the updated stay.</p>}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className={styles.closeBtn} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" className={styles.saveBtn} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>

      <p className={styles.tipText}>
        <MdOutlineTipsAndUpdates /> Tip: Extend your stay to enjoy more days — discounts apply automatically!
      </p>
    </Modal>
  );
};

export default EditBookingModal;
