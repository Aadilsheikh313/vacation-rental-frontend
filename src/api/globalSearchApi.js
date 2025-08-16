import { clientServer } from "../config/axios";

export const globalSearchApi = async (filters = {}) => {
  try {
    const response = await clientServer.get("/api/search", {
      params: filters,   // yahan pe query params jayenge
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error in SearchApi:", error?.response?.data || error.message);
    throw error;
  }
};
