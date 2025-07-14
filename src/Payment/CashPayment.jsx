import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import { showSuccess, showError } from "../utils/toastUtils";

const CashPayment = ({ amount, propertyId, formData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmCash = async () => {
    try {
      await dispatch(
        postBookingPropertyPosts({
          propertyId,
          bookingDate: {
            ...formData,
            paymentMethod: "cash", // ✅ Append here
          },
        })
      ).unwrap();

      showSuccess("Booking confirmed. Please pay cash at check-in!");
      navigate("/my-bookings");
    } catch (err) {
      showError(err?.message || "Cash booking failed.");
    }
  };

  return (
    <div className="text-center">
      <p>
        You selected to <strong>Pay at Property</strong>.
      </p>
      <p>
        Please bring <strong>₹{amount}</strong> on your check-in date.
      </p>
      <p>
        Your booking will be confirmed after you click <strong>Confirm</strong>.
      </p>

      <Button variant="success" onClick={handleConfirmCash}>
        Confirm Booking
      </Button>
    </div>
  );
};

export default CashPayment;
