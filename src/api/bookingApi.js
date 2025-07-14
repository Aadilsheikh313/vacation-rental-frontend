import { clientServer } from "../config/axios"


export const getBookingPropertyApi = async () => {
  const response = await clientServer.get("/api/booking/my-bookings");
  return response.data;
}

// Post new booking — now sends data properly
export const postBookingPropertyApi = async (propertyId, bookingData) => {
  try {
    const response = await clientServer.post(
      `/api/booking/property/${propertyId}`,
      bookingData, // ✅ send full booking data
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Booking posted", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Booking API error", error.response?.data || error.message);
    throw error;
  }
};

//Expiend booking date 
export const editBookingApi = async (checkIn, checkOut, token, guests, bookingId) => {
  try {
    const response = await clientServer.put(
      `/api/booking/bookings/${bookingId}/edit`,
      { checkIn, checkOut, guests },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("✅New  Booking Status", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Booking API error", error.response?.data || error.message);
    throw error;
  }
}

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

//Check booking confilet api 
export const checkBookingConflictApi = async ({ propertyId, token, userId }) => {
  try {
    if (!propertyId || !token) {
      throw new Error("Missing required booking conflict parameters");
    }

    const { data } = await clientServer.get(
      `/api/booking/bookings/${propertyId}/conflict-check`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      }
    );

    return data;
  } catch (error) {
    console.error("❌ Booking conflict API error:", error.response?.data || error.message);
    throw error;
  }
};

//Guest past and Cancelled booking Property 
export const getPastandCancelledBookingApi = async (token) => {
  try {
    const response = await clientServer.get("/api/booking/past-or-cancelled", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Past/Cancelled Booking API error:", error.response?.data || error.message);
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

