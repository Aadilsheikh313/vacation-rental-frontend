// api/bookingApi.js
import { clientServer } from "../config/axios";

/**
 * Get all bookings of logged-in user
 */
export const getBookingPropertyApi = async (token) => {
  try {
    const response = await clientServer.get("/api/booking/my-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("❌ getBookingPropertyApi error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Create temporary booking (online payment flow)
 */
export const createTempBookingApi = async (token, payload) => {
  try {
    const response = await clientServer.post(
      "/api/booking/create-temp",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ createTempBookingApi error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Create booking for CASH method
 */
export const postBookingPropertyApi = async (propertyId, bookingData, token) => {
  try {
    const response = await clientServer.post(
      `/api/booking/property/${propertyId}`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ postBookingPropertyApi error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};



/** Edit / extend / change booking */
export const editBookingApi = async (bookingId, payload, token) => {
  try {
    const response = await clientServer.put(
      `/api/booking/bookings/${bookingId}/edit`,
      payload, // {checkIn, checkOut, guests}
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//Cancel booking 
export const cancelBookingApi = async (bookingId, token) => {
  try {
    const response = await clientServer.delete(
      `/api/booking/bookings/${bookingId}/delete`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("✅ Booking cancel", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Booking API error", error.response?.data || error.message);
    throw error;
  }
}


// Check booking conflict
export const checkBookingConflictApi = async (propertyId, userId, checkIn, checkOut) => {
  try {
    const response = await clientServer.get(
      `/api/booking/bookings/${propertyId}/conflict-check`,
      {
        params: { userId, checkIn, checkOut },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Booking conflict check API error:", error.response?.data || error.message);
    throw error;
  }
};


 


// ✅ Delete Guest's cancelled or past booking
export const deleteGuestHistroyBookingApi = async (bookingId, token) => {
  try {
    const response = await clientServer.delete(`/api/booking/guest/delete-history/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Guest past/cancelled delete API error:", error.response?.data || error.message);
    throw error;
  }
};


//Get Host Active and upcomming booking property
export const getActiveBookingApi = async (token, page = 1, limit = 10) => {
  try {
    const response = await clientServer.get("/api/booking/host/active-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Host Active and Upcomming Booking API error:", error.response?.data || error.message);
    throw error;
  }
}

//Handle Host Accept and Cancel Cash Booking Request
export const handleCashBookingRequestApi = async (token, bookingId, action) => {
  try {
    const response = await clientServer.post('/api/booking/host/booking/aceptandcancel',
      { bookingId, action },
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Host Accept/Cancel Cash Booking API error:", error.response?.data || error.message);
    throw error;
  }
}

//Get Host Histroy booking property 
export const getHostBookingHistoryApi = async (token) => {
  try {
    const response = await clientServer.get("/api/booking/host/history-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Host History Booking API error:", error.response?.data || error.message);
    throw error;
  }
};

