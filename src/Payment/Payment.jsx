import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { createTempBookingApi } from "../api/bookingApi";
import { showError, showSuccess } from "../utils/toastUtils";

const Payment = ({ show, onHide, propertyId, userId, formData, priceDetails }) => {
  const { user, token } = useSelector((state) => state.auth);

  const [paymentLaunched, setPaymentLaunched] = useState(false);

  // Razorpay amount in paise
  const amountRupees = Number(priceDetails?.totalPrice || 0);
  const amountPaise = Math.round(amountRupees * 100);

  // 🟡 Load Razorpay SDK Only Once
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // 🟢 Listen when modal opens
  useEffect(() => {
    if (show && !paymentLaunched) {
      startPaymentProcess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const startPaymentProcess = async () => {
    setPaymentLaunched(true);

    try {
      // 1️⃣ Create pending booking (temporary) on backend
      const tempRes = await createTempBookingApi(token, {
        propertyId,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        serviceFee: formData.serviceFee,
        totalAmount: amountRupees, // rupees
      });

      const booking = tempRes.booking;

      // 2️⃣ Create Razorpay Order
      const orderRes = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/payment/create-order`,
        { bookingId: booking._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderData = orderRes.data.order;

      // 3️⃣ Get Razorpay Key
      const keyRes = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/payment/getkey`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const razorKey = keyRes.data.key;

      // 4️⃣ Open Razorpay Payment Popup
      if (!window.Razorpay) return showError("❌ Razorpay SDK not available!");

      const options = {
        key: razorKey,
        amount: orderData.amount,
        currency: "INR",
        name: "StayHub Booking",
        description: `Booking ${booking.bookingCode || booking._id}`,
        order_id: orderData.id,

        handler: async function (response) {
          try {
            // 5️⃣ Verify Payment
            await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking._id,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            showSuccess("🎉 Payment Successful & Booking Confirmed!");
            onHide();
            window.location.href = `/booking-success/${booking._id}`;
          } catch (error) {
            showError("❌ Payment verification failed. Please contact support.");
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },

        theme: {
          color: "#4c8cf5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      showError(error?.response?.data?.message || "⚠️ Failed to initialize payment");
      setPaymentLaunched(false);
    }
  };

  return null; // Ye modal controll parent ka hai
};

export default Payment;
