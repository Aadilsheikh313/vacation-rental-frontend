import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showSuccess, showError } from "../utils/toastUtils";
import { cancelBookingPosts, getHostBookingHistoryPosts } from "../config/redux/action/bookingAction ";
import { FcCancel } from "react-icons/fc";
import styles from "../stylesModule/Booking/CanncelBooking.module.css"
import { IoMdWarning } from "react-icons/io";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

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
    <Modal show={show} onHide={handleClose} dialogClassName={styles.cancelModal}>
      <Modal.Header className={styles.HeaderModel} >
        <Modal.Title className={styles.modalTitle}>
          <FcCancel /> Confirm Cancellation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong><IoMdWarning /> Are you absolutely sure?</strong></p>
        <p>
          Cancelling this booking means you may lose out on your planned stay and
          memories. A penalty may also apply. Once cancelled, this action cannot
          be undone.
        </p>
        <p className="text-muted"><MdOutlineTipsAndUpdates /> Tip: Consider rescheduling instead of cancelling.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.closeBtn} onClick={handleClose}>
          Keep Booking
        </Button>
        <Button className={styles.cancelBtn} onClick={handleCancel}>
          Yes, Cancel Booking
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default CancelBookingModal;
