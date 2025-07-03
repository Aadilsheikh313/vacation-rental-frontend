import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkBookingConflict } from "../config/redux/action/bookingAction ";


const CheckBookingConflict = ({ propertyId, token, userId, onConflictCheck, bookingDates }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [conflictInfo, setConflictInfo] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [skipBooking, setSkipBooking] = useState(false);

  // Check conflict on mount or when triggered
  useEffect(() => {
  const checkConflict = async () => {
    try {
      const res = await dispatch(checkBookingConflict({ propertyId, token, userId })).unwrap();
      setConflictInfo(res);

      // ✅ Conflict found — show modal
      if (res.alreadyBooked || res.bookedDates.length > 0) {
        setShowConflictModal(true);
      } else {
        // ✅ No conflict — allow booking
        onConflictCheck();
      }
    } catch (error) {
      console.error("Conflict check error", error);
    }
  };

  checkConflict();
}, [propertyId, token, userId, dispatch, onConflictCheck]);

  const handleConflictCancel = () => {
    setShowConflictModal(false);
    // navigate(`/property/${propertyId}`);
  };

  const handleConflictOk = () => {
    setShowConflictModal(false);
    onConflictCheck();
  };

  return (
    <>
      <Modal show={showConflictModal} onHide={handleConflictCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Already Booked</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This property is already booked by you or someone else for certain dates.</p>
          <p><strong>Booked Dates:</strong></p>
          <ul>
            {conflictInfo?.bookedDates?.map((d, i) => (
              <li key={i}>
                {new Date(d.checkIn).toLocaleDateString()} - {new Date(d.checkOut).toLocaleDateString()}
              </li>
            ))}
          </ul>
          <p>Do you still want to try and book with different dates?</p>
        </Modal.Body>
        <Modal.Footer>
        <p className="text-muted">Please choose different check-in/check-out dates.</p>

          <Button variant="secondary" onClick={handleConflictCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleConflictOk}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckBookingConflict;
