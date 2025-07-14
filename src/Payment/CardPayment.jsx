import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import { showError, showSuccess } from "../utils/toastUtils";


const CardPayment = ({ amount, propertyId, formData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleCardPayment = async () => {
    if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      return showError("Please fill all card details");
    }

    try {
      await dispatch(postBookingPropertyPosts({
        propertyId,
        bookingDate: formData,
      })).unwrap();

      showSuccess("Booking successful via Card!");
      navigate("/my-bookings");
    } catch (err) {
      showError(err?.message || "Payment failed.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Card Payment - ₹{amount}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              maxLength={19}
            />
          </Form.Group>

          <div className="d-flex gap-3">
            <Form.Group className="mb-3 flex-grow-1">
              <Form.Label>Expiry</Form.Label>
              <Form.Control
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 flex-grow-1">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                name="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleChange}
                maxLength={4}
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={cardDetails.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" onClick={handleCardPayment} className="w-100">
            Pay ₹{amount} Now
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CardPayment;
