import { clientServer } from "../../config/axios";

export const adminInActivePropertyApi = async (propertyId, reason = "Violation of rules") => {
  try {
    const response = await clientServer.put(`/api/active/inactive/admin/inactivate/${propertyId}`, { reason });
    return response.data;
  } catch (error) {
    console.error("❌ Ban User Error:", error.response?.data || error.message);
    throw error;
  }
};


export const adminActivePropertyApi = async (propertyId, note = "Unbanned after review") => {
  try {
    const response = await clientServer.put(`/api/active/inactive/admin/activate/${propertyId}`, { note });
    return response.data;
  } catch (error) {
    console.error("❌ Unban User Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Fetch all ban/unban logs (Admin only)
 */
export const getActiveLogsApi = async () => {
  try {
    const response = await clientServer.get(`/api/active/inactive/admin/logs/${propertyId}`);
    return response.data.logs;
  } catch (error) {
    console.error("❌ Get Logs Error:", error.response?.data || error.message);
    throw error;
  }
};
