// globalSearchApi.js
import { clientServer } from "../config/axios";

// 🔍 Admin Search API Call
export const adminSearchApi = async (query) => {
  try {
    const response = await clientServer.get(`/api/search/admin/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error in Admin SearchApi:", error?.response?.data || error.message);
    throw error;
  }
};

// 🔍 Guest Search API Call
export const guestSearchApi = async (query) => {
  try {
    const response = await clientServer.get(`/api/search/guest/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error in Guest SearchApi:", error?.response?.data || error.message);
    throw error;
  }
};

// 🔍 Host Search API Call
export const hostSearchApi = async (query) => {
  try {
    const response = await clientServer.get(`/api/search/host/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error in Host SearchApi:", error?.response?.data || error.message);
    throw error;
  }
};
