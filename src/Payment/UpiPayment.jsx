import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import { showSuccess, showError } from "../utils/toastUtils";

const UpiPayment = ({ amount, propertyId, formData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleConfirmPayment = async () => {
    try {
      await dispatch(postBookingPropertyPosts({
        propertyId,
        bookingDate: formData,
      })).unwrap();

      showSuccess("UPI Payment Confirmed!");
      navigate("/my-bookings");
    } catch (error) {
      showError(error?.message || "Payment failed.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("aadil@ybl");
    showSuccess("UPI ID copied!");
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>UPI Payment - ₹{amount}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>Scan the QR code below</h5>
        <img src="/QRCode.jpg" alt="UPI QR" width="200" className="my-3" />
        <p>
          UPI ID: <strong>aadilsheikh5152@ybl</strong>{" "}
          <Button size="sm" variant="outline-primary" onClick={copyToClipboard}>
            Copy
          </Button>
        </p>
        <p className="text-muted">Once paid, click the button below.</p>

        <Button variant="success" onClick={handleConfirmPayment}>
          I Have Paid ₹{amount}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default UpiPayment;
