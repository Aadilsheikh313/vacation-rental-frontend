import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PaypalPayment = ({ amount }) => {
  const [show, setShow] = useState(true);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pay with PayPal</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>This feature is coming soon...</h5>
        <p>You'll be able to pay ₹{amount} using PayPal shortly.</p>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PaypalPayment;
