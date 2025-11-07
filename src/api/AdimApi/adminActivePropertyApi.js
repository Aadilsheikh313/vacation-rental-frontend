// adminActivePropertyApi.js
import { clientServer } from "../../config/axios";

export const adminInActivePropertyApi = async (propertyId, reason = "Violation of rules") => {
  try {
    const response = await clientServer.put(`/api/active/admin/inactivate/${propertyId}`, { reason });
    return response.data;
  } catch (error) {
    console.error("❌ Inactivate Property Error:", error.response?.data || error.message);
    throw error;
  }
};

export const adminActivePropertyApi = async (propertyId, note = "Unbanned after review") => {
  try {
    const response = await clientServer.put(`/api/active/admin/activate/${propertyId}`, { note });
    return response.data;
  } catch (error) {
    console.error("❌ Activate Property Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getActiveLogsApi = async (propertyId) => {
  try {
    const response = await clientServer.get(`/api/active/admin/logs/${propertyId}`);
    return response.data.logs;
  } catch (error) {
    console.error("❌ Get Logs Error:", error.response?.data || error.message);
    throw error;
  }
};
