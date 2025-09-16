import { clientServer } from "../config/axios";

export const GetGuestPastBookingApi = async () => {
  try {
    const response = await clientServer.get('/api/guestDash/pastbooking'); 
    return response;
  } catch (error) {
    console.error("❌ Get all Past booking API error", error.response?.data || error.message);
    throw error;
  }
};
