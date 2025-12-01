import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initiateRazorpayOrder,
  getRazorpayKey,
  verifyPayment,
} from "../config/redux/action/paymentAction";
import { showError } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";

// Prevent double verification request
let isVerifying = false;

const Payment = ({ show, onHide, singlePost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { tempBooking } = useSelector((state) => state.booking);
  const { key } = useSelector((state) => state.payment);

  useEffect(() => {
    if (show && tempBooking) startPayment();
    // eslint-disable-next-line
  }, [show, tempBooking]);

  const startPayment = async () => {
    try {
      const bookingId = tempBooking._id;

      // 1️⃣ Get Razorpay Public Key
      let razorpayKey = key;
      if (!razorpayKey) {
        const k = await dispatch(getRazorpayKey(token)).unwrap();
        razorpayKey = k.key;
      }

      // 2️⃣ Create Razorpay Order
      const orderRes = await dispatch(
        initiateRazorpayOrder({ token, bookingId })
      ).unwrap();
      const order = orderRes.order;

      // 3️⃣ Razorpay Checkout Options
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        name: singlePost,
        description: `Booking Payment - ${tempBooking.bookingCode}`,
        order_id: order.id,

        handler: async function (response) {
          if (isVerifying) return;
          isVerifying = true;

          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId,
          };

          const res = await dispatch(verifyPayment({ token, verifyData }));

          if (verifyPayment.fulfilled.match(res)) {
            onHide?.();
            navigate(`/payment-verification?bookingId=${bookingId}`);
          } else {
            showError("Payment verification failed");
          }
        },

        prefill: {
          name: tempBooking?.user?.name,
          email: tempBooking?.user?.email,
        },
        theme: { color: "#2b5fff" },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", () => onHide?.());
      rzp.on("modal.closed", () => {
        isVerifying = false;
      });
      rzp.on("modal.open", () => {
        setTimeout(() => {
          document.querySelectorAll("svg").forEach((el) => {
            if (el.getAttribute("width") === "auto") el.setAttribute("width", "24");
            if (el.getAttribute("height") === "auto") el.setAttribute("height", "24");
          });
        }, 300);
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      showError("Payment process failed");
      onHide?.();
    }
  };

  return null;
};

export default Payment;
