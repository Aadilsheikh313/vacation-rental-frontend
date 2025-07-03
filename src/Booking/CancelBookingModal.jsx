import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showSuccess, showError } from "../utils/toastUtils";
import { cancelBookingPosts, getHostBookingHistoryPosts } from "../config/redux/action/bookingAction ";

const CancelBookingModal = ({ show, handleClose, bookingId, token }) => {
  const dispatch = useDispatch();

  const handleCancel = async () => {
    try {
      const response = await dispatch(cancelBookingPosts({ bookingId, token })).unwrap();

      const { refundAmount, penaltyAmount } = response;

      showSuccess(`Booking cancelled. ₹${refundAmount || 0} refunded (Penalty: ₹${penaltyAmount || 0})`);

      // ✅ Refresh the host's booking history after cancellation
      dispatch(getHostBookingHistoryPosts({ token }));

      handleClose();
    } catch (error) {
      showError(error);
    }
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to cancel this booking? This action is irreversible.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelBookingModal;
