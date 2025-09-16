import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showSuccess, showError } from "../utils/toastUtils";
import { editBookingPosts } from "../config/redux/action/bookingAction ";
import styles from "../stylesModule/Booking/EditBooking.module.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const EditBookingModal = ({ show, handleClose, booking, token }) => {
  const dispatch = useDispatch();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    if (booking) {
      setCheckIn(booking.checkIn.slice(0, 10));
      setCheckOut(booking.checkOut.slice(0, 10));
      setAdults(booking.guests.adults);
      setChildren(booking.guests.children);
    }
  }, [booking]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const guests = {
      adults: Number(adults),
      children: Number(children),
    };

    try {
      await dispatch(
        editBookingPosts({
          checkIn,
          checkOut,
          guests,
          token,
          bookingId: booking._id,
        })
      ).unwrap();
      showSuccess("Booking updated successfully");
      handleClose();
    } catch (err) {
      showError(err);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName={styles.customModal}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header className={styles.HeaderEdit}>
          <Modal.Title>Modify Your Booking – Change Dates or Guests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Check-In</Form.Label>
            <Form.Control
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Check-Out</Form.Label>
            <Form.Control
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Adults</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Children</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.closeBtn} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" className={styles.saveBtn}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
      <p><MdOutlineTipsAndUpdates />Tip: You can extend your check-out date to enjoy a longer stay.</p>
    </Modal>
  );
};

export default EditBookingModal;
