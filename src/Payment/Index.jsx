
import React, { useState } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import CardPayment from "./CardPayment";
import UpiPayment from "./UpiPayment";
import PaypalPayment from "./PaypalPayment";
import CashPayment from "./CashPayment";
import { useDispatch } from "react-redux";
import { showSuccess, showError } from "../utils/toastUtils";

// Import icons from react-icons
import { FaCreditCard, FaGooglePay, FaPaypal, FaMoneyBillAlt } from "react-icons/fa";
import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import styles from "../stylesModule/payment.module.css";

const PaymentModal = ({ show, onHide, amount, propertyId, formData }) => {
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      setLoading(true);
      await dispatch(
        postBookingPropertyPosts({
          propertyId,
          bookingDate: { ...formData, paymentMethod: method },
        })
      ).unwrap();

      showSuccess("Booking successful!");
      onHide(); // close modal
    } catch (err) {
      showError(err?.message || "Failed to complete booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Choose Your Payment Method</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="text-center mb-3">
          <h5>Total Amount: ₹{amount}</h5>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          <Button
            className={`${styles["payment-option"]} d-flex align-items-center gap-2 ${method === "card" ? styles.selected + " btn-primary" : "btn-outline-primary"
              }`}
            onClick={() => setMethod("card")}
          >
            <FaCreditCard /> Card
          </Button>

          <Button
            className={`${styles["payment-option"]} d-flex align-items-center gap-2 ${method === "upi" ? styles.selected + " btn-success" : "btn-outline-success"
              }`}
            onClick={() => setMethod("upi")}
          >
            <FaGooglePay /> UPI
          </Button>

          <Button
            className={`${styles["payment-option"]} d-flex align-items-center gap-2 ${method === "paypal" ? styles.selected + " btn-info" : "btn-outline-info"
              }`}
            onClick={() => setMethod("paypal")}
          >
            <FaPaypal /> PayPal
          </Button>

          <Button
            className={`${styles["payment-option"]} d-flex align-items-center gap-2 ${method === "cash" ? styles.selected + " btn-warning" : "btn-outline-warning"
              }`}
            onClick={() => setMethod("cash")}
          >
            <FaMoneyBillAlt /> Cash
          </Button>
        </div>


        <div>
          {method === "card" && (
            <CardPayment amount={amount} propertyId={propertyId} formData={formData} />
          )}
          {method === "upi" && (
            <UpiPayment amount={amount} propertyId={propertyId} formData={formData} />
          )}
          {method === "paypal" && (
            <PaypalPayment amount={amount} propertyId={propertyId} formData={formData} />
          )}
          {method === "cash" && (
            <CashPayment amount={amount} propertyId={propertyId} formData={formData} />
          )}

          {!method && (
            <Alert variant="secondary" className="text-center">
              Please select a payment method to proceed.
            </Alert>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="primary"
          disabled={!method || loading}
          onClick={handlePayment}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Processing...
            </>
          ) : (
            "Confirm & Pay"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
