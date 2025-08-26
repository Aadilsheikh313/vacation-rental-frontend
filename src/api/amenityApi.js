import { clientServer } from "../config/axios";

// ✅ Helper to handle API response safely
const handleApiResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Request successful",
    };
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);

    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "Something went wrong, please try again",
      status: error.response?.status || 500,
    };
  }
};

// ✅ Create Amenities
export const amenitiesPostApi = async (propertyId, amenitiesData) => {
  return handleApiResponse(() =>
    clientServer.post(`/api/amenities/${propertyId}`, { propertyId, ...amenitiesData })
  );
};

// ✅ Get Amenities by Property
export const amenitiesGetApi = async (propertyId) => {
  return handleApiResponse(() =>
    clientServer.get(`/api/amenities/${propertyId}`)
  );
};

// ✅ Update Amenities
export const amenitiesUpdateApi = async (propertyId, amenitiesData) => {
  return handleApiResponse(() =>
    clientServer.put(`/api/amenities/${propertyId}`, amenitiesData)
  );
};
