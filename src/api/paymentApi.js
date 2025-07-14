
import { clientServer } from "../config/axios";

// 🔹 Create Razorpay Order
export const createRazorpayOrder = async (token, amount) => {
  try {
    const response = await clientServer.post(
      `/api/payment/create-order`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Payment API error", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Verify Razorpay Payment
export const verifyRazorpayPayment = async (token, payload) => {
  try {
    const response = await clientServer.post(
      `/api/payment/verify`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Payment Verify API error", error.response?.data || error.message);
    throw error;
  }
};
