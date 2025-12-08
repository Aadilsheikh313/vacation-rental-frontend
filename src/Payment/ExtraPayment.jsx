// src/Payment/triggerExtraPayment.js
import { getRazorpayKey, initiateEditExtraRazorpayOrder, verifyEditExtraPayment } from "../config/redux/action/paymentAction";
import { showError } from "../utils/toastUtils";

export const triggerExtraPayment = async ({ dispatch, navigate, token, bookingId }) => {
  try {
    // Get Razorpay Key
    let key = await dispatch(getRazorpayKey(token)).unwrap();
    key = key.key;

    // Create Payment Order
    const orderData = await dispatch(initiateEditExtraRazorpayOrder({ token, bookingId })).unwrap();
    const order = orderData.order;

    let isVerifying = false;
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Booking Update Payment",
      description: `Extra Payment - Booking ${bookingId}`,
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

        const result = await dispatch(verifyEditExtraPayment({ token, verifyData }));

        if (verifyEditExtraPayment.fulfilled.match(result)) {
          navigate(`/extra/payment-verification?bookingId=${bookingId}`);
        } else {
          showError("Payment verification failed");
        }
      },
    };

    new window.Razorpay(options).open();
  } catch (error) {
    showError("Payment failed, please try again");
  }
};