import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateRazorpayOrder, getRazorpayKey } from "../config/redux/action/paymentAction";
import { showError } from "../utils/toastUtils";

const Payment = ({ show, onHide, propertyId, userId, priceDetails }) => {
  
  const dispatch = useDispatch();

  const { key, order, isLoading } = useSelector((state) => state.payment);
  const { user, token } = useSelector((state) => state.auth);

  const amount = priceDetails.totalPrice;

  useEffect(() => {
    if (show) {
      dispatch(getRazorpayKey(token));
      dispatch(initiateRazorpayOrder({ token, amount }));
    }
  }, [show]);

  useEffect(() => {
    if (key && order) {
      openRazorpayPopup();
    }
  }, [key, order]);

  // ⭐ Razorpay Open Popup Function
  const openRazorpayPopup = () => {
    if (!window.Razorpay) {
      return showError("Razorpay SDK not loaded!");
    }

    const options = {
      key: key.key, // server se aata hai
      amount: order.order.amount,
      currency: "INR",
      name: "StayHub Booking",
      description: "Room / Property Booking Payment",
      order_id: order.order.id,
      handler: function (response) {
        alert("Payment Successful!");

        // Backend verify call
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount,
            userId,
            propertyId,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            onHide();
            window.location.href = "/booking-success";
          });
      },

      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },

      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return null; // No UI required for popup
};

export default Payment;
