// src/api/policyApi.js
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

// ✅ Create policy
export const policesPostApi = async (propertyId, policesData) => {
  return handleApiResponse(() =>
    clientServer.post(`/api/polices/${propertyId}`, { propertyId, ...policesData })
  );
};

// ✅ Get policy by Property
export const policesGetApi = async (propertyId) => {
  return handleApiResponse(() =>
    clientServer.get(`/api/polices/${propertyId}`)
  );
};

// ✅ Update policy
export const policesUpdateApi = async (propertyId, policesData) => {
  return handleApiResponse(() =>
    clientServer.put(`/api/polices/${propertyId}`, policesData)
  );
};
