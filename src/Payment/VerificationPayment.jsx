import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPaymentStatus } from "../config/redux/reducer/paymentReducer";
import { Card } from "react-bootstrap";

const PaymentVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams(); // fetch bookingId from URL if refreshed

  const { paymentResult, isSuccess, isError, message } = useSelector(
    (state) => state.payment
  );

  // Auto redirect after success
  useEffect(() => {
    if (isSuccess && paymentResult) {
      const t = setTimeout(() => {
        dispatch(resetPaymentStatus());
        navigate("/my-bookings");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [isSuccess, paymentResult, dispatch, navigate]);

  let payment = paymentResult?.payment;
  let booking = paymentResult?.booking;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Card className="p-4 text-center shadow" style={{ width: "500px" }}>
        {/* ❌ FAILED */}
        {isError && (
          <>
            <h2 className="text-danger">❌ Payment Failed</h2>
            <p>{message}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/my-bookings")}>
              Go to My Bookings
            </button>
          </>
        )}

        {/* ⏳ VERIFYING */}
        {!isError && !isSuccess && (
          <>
            <h2 className="text-secondary mb-3">⏳ Verifying Payment...</h2>
            <p>Please wait, do not close this page.</p>
          </>
        )}

        {/* ✔ SUCCESS */}
        {isSuccess && payment && booking && (
          <>
            <h2 className="text-success">✔ Payment Verified Successfully!</h2>
            <p className="mb-3">🎉 Your booking is confirmed.</p>

            <h4 className="text-start mt-3">📌 Payment Summary</h4>
            <ul className="text-start" style={{ lineHeight: "1.8" }}>
              <li><strong>Property:</strong> {booking.property?.title || "Property Booked"}</li>
              <li><strong>Booking Code:</strong> {booking.bookingCode}</li>
              <li><strong>Amount Paid:</strong> ₹{payment.amount}</li>
              <li><strong>Payment ID:</strong> {payment.razorpay_payment_id}</li>
              <li><strong>Order ID:</strong> {payment.razorpay_order_id}</li>
              <li><strong>Transaction ID:</strong> {payment.transactionId || "N/A"}</li>
              <li><strong>Paid At:</strong> {new Date(payment.createdAt).toLocaleString()}</li>
            </ul>

            <p className="mt-3">
              Redirecting to <b>My Bookings</b> page...
            </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentVerification;
