// api/paymentApi.js
import { clientServer } from "../config/axios";

/**
 * Get Razorpay Public Key
 */
export const getRazorpayKeyApi = async (token) => {
  try {
    const response = await clientServer.get("/api/payment/key", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("❌ getRazorpayKeyApi error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Create Razorpay Order for a pending booking
 */
export const createRazorpayOrder = async (token, bookingId) => {
  try {
    const response = await clientServer.post(
      "/api/payment/order",
      { bookingId },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ createRazorpayOrder error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Verify Razorpay Payment and confirm booking
 */
export const verifyRazorpayPayment = async (token, payload) => {
  try {
    const response = await clientServer.post(
      "/api/payment/verify",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ verifyRazorpayPayment error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const getPaymentStatusApi = async (token, bookingId) => {
  const response = await clientServer.get(`/api/payment/status/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

// EDIT Extra Payment - Create Order
export const createEditExtraPaymentOrderApi = async (token, bookingId) => {
  try {
    const response = await clientServer.post(
      "/api/payment/payment/extra/order",
      { bookingId},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ createEditExtraPaymentOrder error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}


// EDIT Extra Payment - Verify Payment
export const verifyEditExtraPaymentApi = async (token, payload) => {
  try {
    const response = await clientServer.post(
      "/api/payment/payment/extra/verify",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ verifyEditExtraPayment error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};