// globalSearchApi.js
import { clientServer } from "../config/axios";

// 🔍 Global Search API Call
export const globalSearchApi = async (filters = {}) => {
  try {
    const response = await clientServer.get("/api/search/global", {
      params: filters,   // yahan query params jayenge
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error in SearchApi:", error?.response?.data || error.message);
    throw error;
  }
};
