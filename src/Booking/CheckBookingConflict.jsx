import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoWarningOutline } from "react-icons/io5";
import styles from "../stylesModule/Booking/CheckConflict.module.css";
import { Link } from "react-router-dom";

const CheckBookingConflict = ({ conflictData, existingBooking, isError, message, onClose }) => {
  useEffect(() => {
    if (existingBooking) {
    }
  }, [existingBooking]);

  return (
    <Modal show={true} onHide={onClose} centered className={styles.modelContainer}>
      <Modal.Header >
        <Modal.Title className={styles.modelTitle}><IoWarningOutline /> Booking Conflict</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isError ? (
          <p className={styles.isErrorMessage}>{message}</p>
        ) : existingBooking ? (
          <div>
            <p className={styles.woringMessage}>
              You have already booked this property!
            </p>
            <p>
              Booking Dates:{" "}
              <b>
                {new Date(existingBooking.checkIn).toLocaleDateString()} -{" "}
                {new Date(existingBooking.checkOut).toLocaleDateString()}
              </b>
            </p>
            <p className={styles.editBookingMessage}>
              To edit your booking, visit your <b>Guest Dashboard</b>.
            </p>
            <Link
              to="/guest/dashboard"
              className={styles.dashboardLink}
              onClick={onClose}
            >
              Go to Guest Dashboard
            </Link>

          </div>
        ) : (conflictData?.bookedDates || [])?.length > 0 ? (
          <div>
            <p className={styles.Bookinganotheruser}>This property is already booked for the following dates:</p>
            <ul>
              {conflictData.bookedDates.map((d, i) => (
                <li key={i}>
                  {new Date(d.checkIn).toLocaleDateString()} -{" "}
                  {new Date(d.checkOut).toLocaleDateString()}
                </li>
              ))}
            </ul>
            <p className={styles.checkInAndCheckOut}>
              Please select different check-in / check-out dates.
            </p>
          </div>
        ) : (
          <p className={styles.availableMessage}>
            ✅ Good news! This property is available for your selected dates.
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} className={styles.closeButton}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckBookingConflict;
