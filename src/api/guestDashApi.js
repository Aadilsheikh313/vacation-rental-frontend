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

export const GetGuestCurrentBookingApi = async () => {
  try {
    const response = await clientServer.get('/api/guestDash/currentbooking');
    return response;
  } catch (error) {
    console.error("❌ Get all Current booking API error", error.response?.data || error.message);
    throw error;
  }
}
export const GetGuestUpcoomingBookingApi = async () => {
  try {
    const response = await clientServer.get('/api/guestDash/upcommingbooking');
    return response;
  } catch (error) {
    console.error("❌ Get all Upcooming booking API error", error.response?.data || error.message);
    throw error;
  }
}

export const GetGuestCancelBookingApi = async () => {
  try {
    const response = await clientServer.get('/api/guestDash/cancelbooking');
    return response;
  } catch (error) {
    console.error("❌ Get all Caccel booking API error", error.response?.data || error.message);
    throw error;
  }
}